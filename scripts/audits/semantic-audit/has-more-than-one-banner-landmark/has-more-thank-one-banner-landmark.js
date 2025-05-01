import { semanticErrors } from "../../../errors/semantic.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function hasMoreThanOneBannerLandmark(auditResults) {
    const moreThanOneBannerLandmark = await inspectedWindowEval(`
        const isElementVisible = ${isElementVisible.toString()};
        
        return Array.from(document.querySelectorAll("[role='banner']"))
            .filter(banner => isElementVisible(banner)).length
    `)

    if (moreThanOneBannerLandmark > 1) {
        auditResults.push(semanticErrors[7]);
    } 
}