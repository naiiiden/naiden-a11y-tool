import { semanticErrors } from "../../../errors/semantic.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasMoreThanOneContentinfoLandmark(auditResults) {
    const moreThanOneContentinfoLandmark = await inspectedWindowEval(`
        return document.querySelectorAll("[role='contentinfo']").length
    `)

    if (moreThanOneContentinfoLandmark > 1) {
        auditResults.push(semanticErrors[8]);
    }
}