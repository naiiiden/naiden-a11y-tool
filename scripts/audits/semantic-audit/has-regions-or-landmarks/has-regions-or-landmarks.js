import { semanticErrors } from "../../../errors/semantic.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasRegionsOrLandmarks(auditResults) {
    const hasRegionsOrLandmarks = await inspectedWindowEval(`
        return document.querySelectorAll('header, nav, main, footer, aside, form, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="complementary"], [role="search"], :is([role="region"], [role="form"]):is([aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""]))').length
    `);

    if (hasRegionsOrLandmarks < 1) {
        auditResults.push(semanticErrors[4]);
    }
}