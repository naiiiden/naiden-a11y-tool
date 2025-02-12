import { colourErrors } from "../../../errors/colour.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasInsufficientColourContrast(auditResults) {
    const hasInsufficientColourContrast = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};

        function getRGB(color) {
            // Handle different color formats
            if (color.startsWith('rgb')) {
                const [r, g, b] = color.match(/\\d+/g).map(Number);
                return [r, g, b];
            }
            // Handle hex colors
            if (color.startsWith('#')) {
                const hex = color.replace('#', '');
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);
                return [r, g, b];
            }
            // For named colors, create a temporary element
            const temp = document.createElement('div');
            temp.style.color = color;
            document.body.appendChild(temp);
            const computedColor = getComputedStyle(temp).color;
            document.body.removeChild(temp);
            return computedColor.match(/\\d+/g).map(Number);
        }

        function getLuminance(r, g, b) {
            // Convert to sRGB
            let [sR, sG, sB] = [r, g, b].map(val => {
                val = val / 255;
                return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
            });
            // Calculate luminance
            return 0.2126 * sR + 0.7152 * sG + 0.0722 * sB;
        }

        function getContrastRatio(l1, l2) {
            const lighter = Math.max(l1, l2);
            const darker = Math.min(l1, l2);
            return (lighter + 0.05) / (darker + 0.05);
        }

        function isLargeText(element) {
            const style = window.getComputedStyle(element);
            const fontSize = parseFloat(style.fontSize);
            const fontWeight = style.fontWeight;
            
            // Convert px to pt (1pt = 1.333px)
            const fontSizePt = fontSize / 1.333;
            
            return fontSizePt >= 18 || (fontSizePt >= 14 && fontWeight >= 700);
        }

        function isVisible(element) {
            const style = window.getComputedStyle(element);
            return style.display !== 'none' && 
                   style.visibility !== 'hidden' && 
                   style.opacity !== '0' &&
                   element.offsetHeight > 0;
        }

        function getBackgroundColor(element) {
            let currentElement = element;
            let bgColor = 'transparent';
            
            while (currentElement && bgColor === 'transparent') {
                const style = window.getComputedStyle(currentElement);
                bgColor = style.backgroundColor;
                if (bgColor === 'transparent' && currentElement.parentElement) {
                    currentElement = currentElement.parentElement;
                } else if (bgColor === 'transparent') {
                    // Default to white if no background color is found
                    bgColor = 'rgb(255, 255, 255)';
                }
            }
            
            return bgColor;
        }

        const textElements = Array.from(document.querySelectorAll('*:not(script, style)')).filter(element => {
            // Check if element has visible text
            const hasText = element.textContent.trim().length > 0;
            // Exclude elements that only contain other elements
            const hasDirectText = Array.from(element.childNodes)
                .some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);
            return hasText && hasDirectText && isVisible(element);
        });

        return textElements.map(element => {
            const style = window.getComputedStyle(element);
            const foregroundColor = style.color;
            const backgroundColor = getBackgroundColor(element);
            
            const [fR, fG, fB] = getRGB(foregroundColor);
            const [bR, bG, bB] = getRGB(backgroundColor);
            
            const foregroundLuminance = getLuminance(fR, fG, fB);
            const backgroundLuminance = getLuminance(bR, bG, bB);
            
            const contrastRatio = getContrastRatio(foregroundLuminance, backgroundLuminance);
            const requiredRatio = isLargeText(element) ? 3 : 4.5;
            
            const hasInsufficientContrast = contrastRatio < requiredRatio;
            
            return {
                element: element.outerHTML,
                selector: getUniqueSelector(element),
                contrastRatio: contrastRatio.toFixed(2),
                requiredRatio,
                foregroundColor,
                backgroundColor,
                hasInsufficientContrast,
                isLargeText: isLargeText(element)
            };
        }).filter(item => item.hasInsufficientContrast);
    `);

    hasInsufficientColourContrast.forEach(element => {
        auditResults.push({
            ...colourErrors[0],
            element: element.outerHTML,
            selector: element.selector,
        });
    });
}