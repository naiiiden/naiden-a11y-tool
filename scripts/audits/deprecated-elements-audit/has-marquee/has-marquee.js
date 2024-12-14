import { deprecatedElementsErrors } from "../../../errors/deprecated-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasMarquee(auditResults) {
    const hasMarquee = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('marquee'))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element),
            }));
    `);

    hasMarquee.forEach(element => {
        auditResults.push({
            ...deprecatedElementsErrors[0],
            element: element.outerHTML,
            selector: element.selector,
        });
    });
}