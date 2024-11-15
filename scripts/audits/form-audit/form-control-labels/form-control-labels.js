import { formErrors } from "../../../errors/forms.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasFormControlLabels(auditResults) {
    const formControlLabels = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('input, select, textarea, input[id]:not(:is([type="submit"], [type="button"], [type="reset"], [type="hidden"])), select[id], textarea[id]'))
            .map(element => {
                const labelCount = document.querySelectorAll('label[for="' + element.id + '"]').length;
                const wrappingLabel = element.closest('label');
                const hasWrappingLabelWithText = wrappingLabel && wrappingLabel.innerText.trim().length > 0;
                const ariaLabel = element.hasAttribute('aria-label') ? element.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = element.hasAttribute('aria-labelledby') 
                    ? document.getElementById(element.getAttribute('aria-labelledby')) 
                    : null;
                const hasAriaLabel = ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim());

                return { 
                    outerHTML: element.outerHTML,
                    labelCount: labelCount,
                    hasWrappingLabelWithText: hasWrappingLabelWithText,
                    hasAriaLabel: !!hasAriaLabel,
                    selector: getUniqueSelector(element)
                };
          });
    `);
    
    formControlLabels.forEach((element) => {
        if (element.labelCount === 0 && !element.hasWrappingLabelWithText && !element.hasAriaLabel) {
            auditResults.push({ ...formErrors[1], element: element.outerHTML, selector: element.selector });
        } else if (element.labelCount > 1) {
            auditResults.push({ ...formErrors[2], element: element.outerHTML, selector: element.selector });
        }
    });
}