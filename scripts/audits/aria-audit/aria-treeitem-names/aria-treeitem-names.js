import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaTreeitemNames(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-treeitem-name
    const ariaTreeitemNames = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='treeitem']:empty"))
            .filter(element => {
                const ariaLabel = element.hasAttribute('aria-label') ? element.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = element.hasAttribute('aria-labelledby') 
                ? document.getElementById(element.getAttribute('aria-labelledby')) 
                : null;
                
                return !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()));
            })
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `)

    ariaTreeitemNames.forEach(element => {
        auditResults.push({ ...ariaErrors[13], element: element.outerHTML, selector: element.selector });
    });
}