import { colourErrors } from "../../../errors/colour.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasInsufficientColourContrast(auditResults) {
    const hasInsufficientColourContrast = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        function getComputedColor(element, property) {
            return window.getComputedStyle(element)[property];
        }

        function luminance(r, g, b) {
            const a = [r, g, b].map(v => {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        }

        function contrastRatio(color1, color2) {
            const lum1 = luminance(...color1);
            const lum2 = luminance(...color2);
            return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
        }

        function parseRGB(color) {
            const match = color.match(/\d+/g);
            return match ? match.slice(0, 3).map(Number) : null;
        }

        function isLargeText(element) {
            const fontSize = parseFloat(getComputedColor(element, 'font-size'));
            const fontWeight = getComputedColor(element, 'font-weight');
            return fontSize >= 24 || (fontSize >= 19 && parseInt(fontWeight) >= 700);
        }

        return Array.from(document.querySelectorAll('*'))
            .filter(element => {
                const color = parseRGB(getComputedColor(element, 'color'));
                const bgColor = parseRGB(getComputedColor(element, 'background-color'));
                if (!color || !bgColor) return false;
                const ratio = contrastRatio(color, bgColor);
                return ratio < (isLargeText(element) ? 3 : 4.5);
            })
            .map(element => {
                return {
                    selector: getUniqueSelector(element),
                    outerHTML: element.outerHTML,
                    textColor: getComputedColor(element, 'color'),
                    backgroundColor: getComputedColor(element, 'background-color'),
                    contrastRatio: contrastRatio(
                        parseRGB(getComputedColor(element, 'color')),
                        parseRGB(getComputedColor(element, 'background-color'))
                    ).toFixed(2)
                };
            });
    `)

    hasInsufficientColourContrast.forEach(element => {
        auditResults.push({
            ...colourErrors[0],
            element: element.outerHTML,
            selector: element.selector,
        });
    });
}