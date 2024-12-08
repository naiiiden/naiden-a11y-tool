import { embeddedElementsErrors } from "../../../errors/embedded-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasFrameUniqueTitles(auditResults) {
    const hasFrameUniqueTitles = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};

        const frames = Array.from(document.querySelectorAll('iframe, frame'));
        const titleMap = new Map();

        return frames.map(frame => {
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