import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaRoleRequiredAriaAttributes(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-required-attr
    const ariaRoleRequiredAriaAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            [role='checkbox']:not([aria-checked]), 
            [role='combobox']:not([aria-controls], [aria-expanded]), 
            [role='heading']:not([aria-level]), 
            [role='meter']:not([aria-valuenow]), 
            [role='menuitemcheckbox']:not([aria-checked]), 
            [role='option']:not([aria-selected]), 
            [role='radio']:not([aria-checked]), 
            [role='scrollbar']:not([aria-controls], [aria-valuenow]), 
            [role='separator']:not([aria-valuenow]), 
            [role='slider']:not([aria-valuenow]), 
            [role='switch']:not([aria-checked])
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }))
    `)

    ariaRoleRequiredAriaAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[17], element: element.outerHTML, selector: element.selector });
    });
}