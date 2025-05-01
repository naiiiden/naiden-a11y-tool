import { semanticErrors } from "../../../errors/semantic.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function hasRegionsOrLandmarks(auditResults) {
    const hasRegionsOrLandmarks = await inspectedWindowEval(`
        const isElementVisible = ${isElementVisible.toString()};

        return Array.from(document.querySelectorAll('header, nav, main, footer, aside, form, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="complementary"], [role="search"], :is([role="region"], [role="form"]):is([aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""]))'))
            .filter(regionOrLandmark => isElementVisible(regionOrLandmark)).length
    `);

    if (hasRegionsOrLandmarks < 1) {
        auditResults.push(semanticErrors[4]);
    }
}