import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasAsideInOtherLandmarks() {
    return Array.from(document.querySelectorAll(`
      :is(header, nav, main, section, form, article, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
            :is([role="region"], [role="form"]):is(
                [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
            ), 
            [role="complementary"], [role="contentinfo"], [role="search"]) 
      :is(aside:not([role]), [role="complementary"])
    `))
        .filter(aside => isElementVisible(aside))
        .map(aside => ({
            outerHTML: aside.outerHTML,
            selector: getUniqueSelector(aside)
        }));
}

export async function hasAsideInOtherLandmarksEval(auditResults) {
    const asidesInOtherLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasAsideInOtherLandmarks = ${hasAsideInOtherLandmarks.toString()};

        return hasAsideInOtherLandmarks();
    `);

    asidesInOtherLandmarks.forEach(aside => {
        auditResults.push({
            ...semanticErrors[10],
            element: aside.outerHTML,
            selector: aside.selector
        });
    });
}