import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasHeadings(auditResults) {
    const hasHeadings = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]')).length > 0
        `, resolve);
    });
    
    if (!hasHeadings) {
        auditResults.push(semanticErrors[3]);
    }
}