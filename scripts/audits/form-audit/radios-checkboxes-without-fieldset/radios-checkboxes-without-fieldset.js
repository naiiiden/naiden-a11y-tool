import { formErrors } from "../../../errors/forms.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasRadiosAndCheckboxesWithoutFieldset(auditResults) {
    const radiosAndCheckboxesWithoutFieldset = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const elements = Array.from(document.querySelectorAll('input[type="radio"]:not(fieldset input), input[type="checkbox"]:not(fieldset input)'));
        const groupedByName = elements.reduce((groups, input) => {
            if (!groups[input.name]) 
                groups[input.name] = [];
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
}