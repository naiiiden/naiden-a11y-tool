import { formErrors } from "../errors/forms.js";
import { getUniqueSelector, inspectedWindowEval } from "../utils.js";

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
      return Array.from(document.querySelectorAll('input[id]:not(:is([type="submit"], [type="button"], [type="reset"], [type="hidden"])), select[id], textarea[id]'))
        .map(element => {
          const labelCount = document.querySelectorAll('label[for="' + element.id + '"]').length;
          const wrappingLabel = element.closest('label');
          const hasWrappingLabelWithText = wrappingLabel && wrappingLabel.innerText.trim().length > 0;

          return { 
            outerHTML: element.outerHTML,
            labelCount: labelCount + (wrappingLabel ? 1 : 0),
            hasTextInWrappingLabel: hasWrappingLabelWithText,
            selector: getUniqueSelector(element)
          };
        });  
    `)
      
    formControlLabels.forEach((element) => {
      if (element.labelCount === 0 || element.labelCount === 1 && !element.hasTextInWrappingLabel) {
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

    const emptySubmitButtonOrResetInputValues = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll('input[type="button"], input[type="submit"], input[type="reset"]'))
        .filter(input => {
          const inputType = input.getAttribute('type');
          const value = input.getAttribute('value');
          const ariaLabel = input.hasAttribute('aria-label') ? input.getAttribute('aria-label').trim() : null;
          const ariaLabelledby = input.hasAttribute('aria-labelledby') 
              ? document.getElementById(input.getAttribute('aria-labelledby')) 
              : null;
          const title = input.hasAttribute('title') ? input.getAttribute('title').trim() : null;
          
          if (inputType === 'submit' || inputType === 'reset') {
            return !value && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
          }
    
          return (!value || value === "") && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
        })
        .map(input => ({
          outerHTML: input.outerHTML,
          selector: getUniqueSelector(input)
        }));
    `);
    
    emptySubmitButtonOrResetInputValues.forEach(control => {
      auditResults.push({ 
        ...formErrors[5], 
        element: control.outerHTML, 
        selector: control.selector 
      });
    });

    const imageInputs = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll('input[type="image"]'))
          .filter(input => {
              const alt = input.getAttribute('alt');
              const ariaLabel = input.hasAttribute('aria-label') ? input.getAttribute('aria-label').trim() : null;
              const ariaLabelledby = input.hasAttribute('aria-labelledby') 
                  ? document.getElementById(input.getAttribute('aria-labelledby')) 
                  : null;

              return !alt?.trim() && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()));
          })
        .map(input => ({ 
            outerHTML: input.outerHTML, 
            selector: getUniqueSelector(input) 
        }));
    `)

    imageInputs.forEach(input => {
      auditResults.push({ ...formErrors[6], element: input.outerHTML, selector: input.selector });
    });
}