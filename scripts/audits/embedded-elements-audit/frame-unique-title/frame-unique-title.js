import { embeddedElementsErrors } from "../../../errors/embedded-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function hasFrameUniqueTitles(auditResults) {
    const hasFrameUniqueTitles = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};

        const titleMap = new Map();
        return Array.from(document.querySelectorAll('iframe, frame'))
            .filter(frame => isElementVisible(frame))
            .map(frame => {
                const title = frame.hasAttribute('title') ? frame.getAttribute('title').trim() : null;

                if (!title) return null;

                const selector = getUniqueSelector(frame);

                if (titleMap.has(title)) {
                    titleMap.get(title).push(selector);
                    return {
                        element: frame.outerHTML,
                        selector,
                    };
                }

                titleMap.set(title, [selector]);

                return null;
            }).filter(issue => issue !== null);
    `);

    hasFrameUniqueTitles.forEach(element => {
        auditResults.push({
            ...embeddedElementsErrors[2],
            element: element.element,
            selector: element.selector,
        });
    });
}