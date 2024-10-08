import { formErrors } from "./errors.js";

export async function formAudit(auditResults) {
    const labels = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`Array.from(document.querySelectorAll("label")).filter(label => label.innerText.trim() === "").map(label => label.outerHTML)`, resolve)
    });
  
    labels.forEach(() => {
        auditResults.push(formErrors[0]);
    });

    const missingLabels = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('input[id]')).filter(input => {
                const labelCount = document.querySelectorAll('label[for="' + input.id + '"]').length;
                return labelCount === 0;
            }).map(input => input.outerHTML)
        `, resolve);
    });
    
    missingLabels.forEach(() => {
        auditResults.push(formErrors[1]); 
    });

    const multipleLabels = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          Array.from(document.querySelectorAll('input[id]')).filter(input => {
            const labelCount = document.querySelectorAll('label[for="' + input.id + '"]').length;
            return labelCount > 1;
          }).map(input => input.outerHTML)
        `, resolve);
    });
    
    multipleLabels.forEach(() => {
        auditResults.push(formErrors[2]);
    });
}