import { cssErrors } from "../../../errors/css.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasVerySmallText(auditResults) {
    const hasVerySmallText = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};

        return Array.from(document.querySelectorAll('*'))
            .filter(element => {
                const computedStyle = window.getComputedStyle(element);
                const fontSize = parseFloat(computedStyle.fontSize);
                return fontSize > 0 && fontSize <= 10;
            })
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element),
                fontSize: window.getComputedStyle(element).fontSize
            }));
    `);

    hasVerySmallText.forEach(element => {
        auditResults.push({
            ...cssErrors[0],
            element: element.outerHTML,
            selector: element.selector,
        });
    });
}