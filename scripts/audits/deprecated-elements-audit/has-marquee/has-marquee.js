import { deprecatedElementsErrors } from "../../../errors/deprecated-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function hasMarquee(auditResults) {
    const hasMarquee = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};

        return Array.from(document.querySelectorAll('marquee'))
            .filter(element => isElementVisible(element))
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