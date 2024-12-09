import { cssErrors } from "../../../errors/css.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasUnderlinedText(auditResults) {
    const hasUnderlinedText = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};

        return Array.from(document.querySelectorAll('*'))
            .filter(element => {
                const isUnderlined = window.getComputedStyle(element).textDecorationLine === 'underline';
                const isExplicitUElement = element.tagName.toLowerCase() === 'u';
                const isNotLink = element.tagName.toLowerCase() !== 'a';

                return (isUnderlined || isExplicitUElement) && isNotLink;
            })
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element),
            }));
    `);

    hasUnderlinedText.forEach(element => {
        auditResults.push({
            ...cssErrors[1],
            element: element.outerHTML,
            selector: element.selector,
        });
    });
}