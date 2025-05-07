import { deprecatedElementsErrors } from "../../../errors/deprecated-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasMarquee() {
    return Array.from(document.querySelectorAll('marquee'))
        .filter(element => isElementVisible(element))
        .map(element => ({
            outerHTML: element.outerHTML,
            selector: getUniqueSelector(element),
        }));
}

export async function hasMarqueeEval(auditResults) {
    const marquee = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasMarquee = ${hasMarquee.toString()};

        return hasMarquee();
    `);

    marquee.forEach(element => {
        auditResults.push({
            ...deprecatedElementsErrors[0],
            element: element.outerHTML,
            selector: element.selector,
        });
    });
}