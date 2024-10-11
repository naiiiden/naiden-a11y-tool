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

    const fieldsets = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          Array.from(document.querySelectorAll('fieldset')).filter(fieldset => {
            return fieldset.querySelector('legend') === null;
          }).map(fieldset => fieldset.outerHTML)
        `, resolve);
    });
    
    fieldsets.forEach(() => {
        auditResults.push(formErrors[3]); 
    });

    const radiosAndCheckboxesWithoutFieldset = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          (() => {
            const elements = Array.from(document.querySelectorAll('input[type="radio"], input[type="checkbox"]'));
            const groupedByName = elements.reduce((groups, input) => {
              if (!groups[input.name]) groups[input.name] = [];
              groups[input.name].push(input);
              return groups;
            }, {});
    
            return Object.values(groupedByName)
              .filter(group => group.length > 1)
              .filter(group => {
                return !group.every(input => input.closest('fieldset'));
              })
              .map(group => group.map(input => input.outerHTML));
          })();
        `, resolve);
    });
    
    radiosAndCheckboxesWithoutFieldset.forEach(() => {
        auditResults.push(formErrors[4]);
    });

    const emptySubmitOrButtonInput = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`Array.from(document.querySelectorAll('input[type="button"], input[type="submit"]')).filter(input => input.value === "").map(input => input.outerHTML)`, resolve)
    });

    emptySubmitOrButtonInput.forEach(() => {
        auditResults.push(formErrors[5]);
    });
}