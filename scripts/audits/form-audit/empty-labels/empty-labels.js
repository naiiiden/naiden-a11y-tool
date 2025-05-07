import { formErrors } from "../../../errors/forms.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasEmptyLabels() {
    return Array.from(document.querySelectorAll("label"))
        .filter(label => {
            if (!isElementVisible(label)) {
                return false;
            }
    
            const ariaLabel = label.hasAttribute('aria-label') ? label.getAttribute('aria-label').trim() : null;
            const ariaLabelledby = label.hasAttribute('aria-labelledby') 
            ? document.getElementById(label.getAttribute('aria-labelledby')) 
            : null;
            const title = label.hasAttribute('title') ? label.getAttribute('title').trim() : null;
    
            return label.textContent.trim() === "" && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
        })
        .map(label => ({ 
            outerHTML: label.outerHTML, 
            selector: getUniqueSelector(label) 
        }))
}

export async function hasEmptyLabelsEval(auditResults) {
    const emptyLabels = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasEmptyLabels = ${hasEmptyLabels.toString()};

        return hasEmptyLabels();
    `)

    emptyLabels.forEach(label => {
        auditResults.push({ ...formErrors[0], element: label.outerHTML, selector: label.selector });
    });
}