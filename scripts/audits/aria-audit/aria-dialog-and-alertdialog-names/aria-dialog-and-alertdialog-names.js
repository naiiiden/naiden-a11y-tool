import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaDialogAndAlertDialogNames(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-dialog-name
    const ariaDialogAndAlertDialogNames = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='dialog'], [role='alertdialog']"))
            .filter(element => {
                const ariaLabel = element.hasAttribute('aria-label') ? element.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = element.hasAttribute('aria-labelledby') 
                    ? document.getElementById(element.getAttribute('aria-labelledby')) 
                    : null;
                const title = element.hasAttribute('title') ? element.getAttribute('title').trim() : null;
    
                return !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
            })
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `)

    ariaDialogAndAlertDialogNames.forEach(element => {
        auditResults.push({ ...ariaErrors[10], element: element.outerHTML, selector: element.selector });
    });
}