import { formErrors } from "../../../errors/forms.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasFieldsetsMissingLegend(auditResults) {
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
}