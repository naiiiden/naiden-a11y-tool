import { semanticErrors } from "../../../errors/semantic.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasHeadings(auditResults) {
    const hasHeadings = await inspectedWindowEval(`
        return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]')).length > 0
    `)
    
    if (!hasHeadings) {
        auditResults.push(semanticErrors[3]);
    }
}