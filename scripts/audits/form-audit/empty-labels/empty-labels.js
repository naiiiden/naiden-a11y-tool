import { formErrors } from "../../../errors/forms.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function hasEmptyLabels(auditResults) {
    const emptyLabels = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};

        return Array.from(document.querySelectorAll("label"))
            .filter(label => {
                if (!isElementVisible(label)) {
                    return false;
                }

                return label.textContent.trim() === "";
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