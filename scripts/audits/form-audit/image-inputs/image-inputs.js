import { formErrors } from "../../../errors/forms.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function hasImageInputs(auditResults) {
    const imageInputs = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};

        return Array.from(document.querySelectorAll('input[type="image"]'))
            .filter(input => {
                if (!isElementVisible(input)) {
                    return false;
                }

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