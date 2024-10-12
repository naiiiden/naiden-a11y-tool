import { semanticErrors } from "./errors.js";

export async function semanticAudit(auditResults) {
    const hasH1 = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`document.querySelector('h1') !== null`, resolve);
    });
    
    if (!hasH1) {
        auditResults.push(semanticErrors[0]);
    }
}