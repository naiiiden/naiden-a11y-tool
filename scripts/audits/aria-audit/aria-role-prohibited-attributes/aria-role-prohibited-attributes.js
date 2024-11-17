import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaRoleProhibitedAttributes(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-prohibited-attr
    const ariaRolePermittedAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            [role='caption']:has([aria-label], [aria-labelledby]), 
            [role='code']:has([aria-label], [aria-labelledby]), 
            [role='deletion']:has([aria-label], [aria-labelledby]), 
            [role='emphasis']:has([aria-label], [aria-labelledby]), 
            [role='generic']:has([aria-label], [aria-labelledby], [aria-roledescription]), 
            [role='insertion']:has([aria-label], [aria-labelledby]), 
            [role='paragraph']:has([aria-label], [aria-labelledby]), 
            [role='presentation']:has([aria-label], [aria-labelledby]), 
            [role='strong']:has([aria-label], [aria-labelledby]), 
            [role='subscript']:has([aria-label], [aria-labelledby]), 
            [role='superscript']:has([aria-label], [aria-labelledby])
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }))
    `)

    ariaRolePermittedAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[20], element: element.outerHTML, selector: element.selector });
    });
}