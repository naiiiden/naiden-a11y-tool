import { formErrors } from "./errors.js";

export async function formAudit(auditResults) {
    const labels = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`Array.from(document.querySelectorAll("label")).filter(label => label.innerText.trim() === "").map(label => label.outerHTML)`, resolve)
    });
  
    labels.forEach(() => {
        auditResults.push(formErrors[0]);
    });

    const inputAndSelectLabels = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          Array.from(document.querySelectorAll('input[id], select[id], textarea[id]')).map(element => {
            const labelCount = document.querySelectorAll('label[for="' + element.id + '"]').length;
            return { html: element.outerHTML, labelCount: labelCount };
          })
        `, resolve);
    });
      
    inputAndSelectLabels.forEach((element) => {
        if (element.labelCount === 0) {
            auditResults.push(formErrors[1]);
        } else if (element.labelCount > 1) {
            auditResults.push(formErrors[2]);
        }
    });
}