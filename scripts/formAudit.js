import { formErrors } from "./errors.js";
import { getUniqueSelector, inspectedWindowEval } from "./utils.js";

export async function formAudit(auditResults) {
   const labels = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll("label"))
        .filter(label => label.innerText.trim() === "")
        .map(label => ({ 
          outerHTML: label.outerHTML, 
          selector: getUniqueSelector(label) 
        }))
    `)
  
    labels.forEach(label => {
        auditResults.push({ ...formErrors[0], element: label.outerHTML, selector: label.selector });
    });

    const inputAndSelectLabels = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll('input[id], select[id], textarea[id]'))
        .map(element => {
          const labelCount = document.querySelectorAll('label[for="' + element.id + '"]').length;
          return { 
            outerHTML: element.outerHTML,
            labelCount: labelCount,
            selector: getUniqueSelector(element)
          };
        });  
    `)
      
    inputAndSelectLabels.forEach((element) => {
      if (element.labelCount === 0) {
          auditResults.push({ ...formErrors[1], element: element.outerHTML, selector: element.selector });
      } else if (element.labelCount > 1) {
          auditResults.push({ ...formErrors[2], element: element.outerHTML, selector: element.selector });
      }
    });

    const fieldsets = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          (() => {
            const getUniqueSelector = ${getUniqueSelector.toString()};
            return Array.from(document.querySelectorAll('fieldset'))
              .filter(fieldset => {
                return fieldset.querySelector('legend') === null;
              })
              .map(fieldset => ({ 
                outerHTML: fieldset.outerHTML, 
                selector: getUniqueSelector(fieldset) 
              }))
          })()
        `, resolve);
    });
    
    fieldsets.forEach(fieldset => {
        auditResults.push({ ...formErrors[3], element: fieldset.outerHTML, selector: fieldset.selector }); 
    });

    const radiosAndCheckboxesWithoutFieldset = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval(`
        (() => {
          const getUniqueSelector = ${getUniqueSelector.toString()};
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
            .map(group => group.map(input => ({
              outerHTML: input.outerHTML,
              selector: getUniqueSelector(input)
            })));
        })()
      `, resolve);
    });
  
    radiosAndCheckboxesWithoutFieldset.forEach((group) => {
        group.forEach(input => {
            auditResults.push({
                ...formErrors[4],
                element: input.outerHTML,
                selector: input.selector
            });
        });
    });

    const emptySubmitOrButtonInput = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          (() => {
            const getUniqueSelector = ${getUniqueSelector.toString()};
            return Array.from(document.querySelectorAll('input[type="button"], input[type="submit"]'))
              .filter(input => input.value === "")
              .map(input => ({ 
                outerHTML: input.outerHTML,
                selector: getUniqueSelector(input)
              }))
          })()
        `, resolve)
    });

    emptySubmitOrButtonInput.forEach(control => {
        auditResults.push({ ...formErrors[5], element: control.outerHTML, selector: control.selector });
    });
}