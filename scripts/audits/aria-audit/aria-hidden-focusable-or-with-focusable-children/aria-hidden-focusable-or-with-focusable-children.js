import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaHiddenFocusableOrWithFocusableChildren(auditResults) {
     // https://dequeuniversity.com/rules/axe/4.10/aria-hidden-focus
     const ariaHiddenFocusableOrWithFocusableChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[aria-hidden='true']"))
            .filter(element => {
                return Array.from(element.querySelectorAll("a, :is(input, textarea, select, button):not(:disabled), [tabindex]:not([tabindex^='-'])")) 
                    .some(child => window.getComputedStyle(child).display !== 'none');
            })
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `);

    ariaHiddenFocusableOrWithFocusableChildren.forEach(element => {
        auditResults.push({ ...ariaErrors[8], element: element.outerHTML, selector: element.selector });
    })
}