import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaTextNoFocusableChildren(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-text
    const ariaTextNoFocusableChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};

        return Array.from(document.querySelectorAll("[role='text']"))
            .map(element => {
                const focusableDescendants = Array.from(element.querySelectorAll(\`
                                                                                   a[href], 
                                                                                   :is(input:not([type='hidden']), textarea, select, button):not(:disabled), 
                                                                                   [tabindex]:not([tabindex^='-'], [tabindex='']), 
                                                                                   [contenteditable]:not([contenteditable='false']), 
                                                                                   summary:not([tabindex^="-"], [tabindex='']), 
                                                                                   :is(audio, video)[controls],
                                                                                   embed,
                                                                                   area[href]:is(map[name]:not([name='']) area)
                                                                                 \`));

                if (focusableDescendants.length > 0) {
                    return {
                        outerHTML: element.outerHTML,
                        selector: getUniqueSelector(element),
                        focusableDescendants: focusableDescendants.map(child => ({
                            outerHTML: child.outerHTML,
                            selector: getUniqueSelector(child)
                        }))
                    };
                }

                return null;
            })
            .filter(result => result !== null);
    `);

    ariaTextNoFocusableChildren.forEach(element => {
        auditResults.push({
            ...ariaErrors[11],
            element: element.outerHTML,
            selector: element.selector,
            message: 
                `The element with role="text" contains focusable descendants, which is not allowed. Focusable descendants:${element.focusableDescendants
                .map(descendant => `\n- Focusable element: ${descendant.outerHTML}`)
                .join("")}`
        });
    });
}