import { formErrors } from "./errors.js";

export async function formAudit(auditResults) {
    const labels = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`Array.from(document.querySelectorAll("label")).filter(label => label.innerText.trim() === "").map(label => label.outerHTML)`, resolve)
    });
  
    labels.forEach(() => {
        auditResults.push(formErrors[0]);
    });

    const inputLabels = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          Array.from(document.querySelectorAll('input[id]')).map(input => {
            const labelCount = document.querySelectorAll('label[for="' + input.id + '"]').length;
            return { html: input.outerHTML, labelCount: labelCount };
          })
        `, resolve);
      });
      
      inputLabels.forEach((input) => {
        if (input.labelCount === 0) {
          auditResults.push(formErrors[1]);  
        } else if (input.labelCount > 1) {
          auditResults.push(formErrors[2]);
        }
    });

    const missingSelectLabels = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('select[id]')).filter(select => {
                const labelCount = document.querySelectorAll('label[for="' + select.id + '"]').length;
                return labelCount === 0;
            }).map(select => select.outerHTML)
        `, resolve);
    });
    
    missingSelectLabels.forEach(() => {
        auditResults.push(formErrors[3]); 
    });

    const multipleSelectLabels = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          Array.from(document.querySelectorAll('select[id]')).filter(select => {
            const labelCount = document.querySelectorAll('label[for="' + select.id + '"]').length;
            return labelCount > 1;
          }).map(select => select.outerHTML)
        `, resolve);
    });
    
    multipleSelectLabels.forEach(() => {
        auditResults.push(formErrors[4]);
    });
}