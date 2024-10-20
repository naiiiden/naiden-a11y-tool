import { formErrors } from "./errors.js";
import { getUniqueSelector, inspectedWindowEval } from "./utils.js";

export async function formAudit(auditResults) {
   const emptyLabels = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll("label:empty"))
        .map(label => ({ 
          outerHTML: label.outerHTML, 
          selector: getUniqueSelector(label) 
        }))
    `)
  
    emptyLabels.forEach(label => {
        auditResults.push({ ...formErrors[0], element: label.outerHTML, selector: label.selector });
    });

    const formControlLabels = await inspectedWindowEval(`
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
      
    formControlLabels.forEach((element) => {
      if (element.labelCount === 0) {
          auditResults.push({ ...formErrors[1], element: element.outerHTML, selector: element.selector });
      } else if (element.labelCount > 1) {
          auditResults.push({ ...formErrors[2], element: element.outerHTML, selector: element.selector });
      }
    });

    const fieldsetsMissingLegends = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll('fieldset:not(:has(legend))'))
        .map(fieldset => ({ 
          outerHTML: fieldset.outerHTML, 
          selector: getUniqueSelector(fieldset) 
        }))
    `)
    
    fieldsetsMissingLegends.forEach(fieldset => {
        auditResults.push({ ...formErrors[3], element: fieldset.outerHTML, selector: fieldset.selector }); 
    });

    const radiosAndCheckboxesWithoutFieldset = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      const elements = Array.from(document.querySelectorAll('input[type="radio"]:not(fieldset input), input[type="checkbox"]:not(fieldset input)'));
      const groupedByName = elements.reduce((groups, input) => {
        if (!groups[input.name]) groups[input.name] = [];
        groups[input.name].push(input);
        return groups;
      }, {});

      return Object.values(groupedByName)
        .filter(group => group.length > 1)
        .map(group => group.map(input => ({
          outerHTML: input.outerHTML,
          selector: getUniqueSelector(input)
        })));
    `)
  
    radiosAndCheckboxesWithoutFieldset.forEach((group) => {
        group.forEach(input => {
            auditResults.push({
                ...formErrors[4],
                element: input.outerHTML,
                selector: input.selector
            });
        });
    });

    const emptySubmitOrButtonInputValues = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    return Array.from(document.querySelectorAll(':is(input[type="button"], input[type="submit"])[value=""]'))
      .map(input => ({ 
        outerHTML: input.outerHTML,
        selector: getUniqueSelector(input)
      }))
    `) 

    emptySubmitOrButtonInputValues.forEach(control => {
        auditResults.push({ ...formErrors[5], element: control.outerHTML, selector: control.selector });
    });
}