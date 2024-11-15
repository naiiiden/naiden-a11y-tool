import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaTextNoFocusableChildren(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-text
    const ariaTextNoFocusableChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='text']:has(a, :is(input, textarea, select, button):not(:disabled), [tabindex]:not([tabindex^='-']))"))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `)

    ariaTextNoFocusableChildren.forEach(element => {
        auditResults.push({ ...ariaErrors[11], element: element.outerHTML, selector: element.selector });
    });
}