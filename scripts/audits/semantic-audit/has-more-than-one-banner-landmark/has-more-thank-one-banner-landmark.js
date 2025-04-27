import { semanticErrors } from "../../../errors/semantic.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasMoreThanOneBannerLandmark(auditResults) {
    const moreThanOneBannerLandmark = await inspectedWindowEval(`
        return document.querySelectorAll("[role='banner']").length
    `)

    if (moreThanOneBannerLandmark > 1) {
        auditResults.push(semanticErrors[7]);
    } 
}