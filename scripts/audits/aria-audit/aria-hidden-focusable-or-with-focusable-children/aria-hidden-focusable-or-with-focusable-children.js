import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaHiddenFocusableOrWithFocusableChildren(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-hidden-focus
    const ariaHiddenFocusableOrWithFocusableChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const focusableElementSelector = \`a, 
                                    [contenteditable]:not([contenteditable='false']), 
                                    :is(input, textarea, select, button):not(:disabled), 
                                    [tabindex]:not([tabindex^='-'])
                                  \`;

        return Array.from(document.querySelectorAll("[aria-hidden='true']"))
            .filter(element => {
                return Array.from(element.querySelectorAll(focusableElementSelector))
                    .some(child => window.getComputedStyle(child).display !== 'none');
            })
            .map(element => {
                const focusableChildren = Array.from(element.querySelectorAll(focusableElementSelector))
                    .filter(child => window.getComputedStyle(child).display !== 'none');

                return {
                    outerHTML: element.outerHTML,
                    selector: getUniqueSelector(element),
                    focusableChildren: focusableChildren.map(child => ({
                        outerHTML: child.outerHTML,
                        selector: getUniqueSelector(child)
                    }))
                };
            });
    `);

    ariaHiddenFocusableOrWithFocusableChildren.forEach(element => {
        auditResults.push({
            ...ariaErrors[8],
            element: element.outerHTML,
            selector: element.selector,
            message: `The element with \`aria-hidden="true"\` contains the following focusable or interactive children, which should not be focusable:
                ${element.focusableChildren
                  .map(child => `\n- Focusable element: ${child.outerHTML}`)
                  .join("")}`
        });
    });
}
