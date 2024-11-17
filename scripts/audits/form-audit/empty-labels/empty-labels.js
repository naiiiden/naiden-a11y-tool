import { formErrors } from "../../../errors/forms.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasEmptyLabels(auditResults) {
    const emptyLabels = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("label"))
            .filter(label => {
                return label.innerText.trim() === "";
            })
            .map(label => ({ 
                outerHTML: label.outerHTML, 
                selector: getUniqueSelector(label) 
            }))
    `)

    emptyLabels.forEach(label => {
        auditResults.push({ ...formErrors[0], element: label.outerHTML, selector: label.selector });
    });
}