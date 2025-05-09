import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasAriaTextNoFocusableChildren() {
    return Array.from(document.querySelectorAll("[role='text']"))
        .map(element => {
            const focusableDescendants = Array.from(element.querySelectorAll(`
                                                                                :is(
                                                                                    :is([role='button'], [role='link'])[tabindex]:not([tabindex^='-'], [tabindex='']), 
                                                                                    a[href], 
                                                                                    :is(input:not([type='hidden']), textarea, select, button):not(:disabled), 
                                                                                    [tabindex]:not([tabindex^='-'], [tabindex='']), 
                                                                                    [contenteditable]:not([contenteditable='false']), 
                                                                                    summary:not([tabindex^="-"], [tabindex='']), 
                                                                                    :is(audio, video)[controls],
                                                                                    embed,
                                                                                    area[href]:is(map[name]:not([name='']) area)
                                                                                ):not([tabindex='-1'])
                                                                             `)).filter(element => isElementVisible(element));
    
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
}

export async function hasAriaTextNoFocusableChildrenEval(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-text
    const ariaTextNoFocusableChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasAriaTextNoFocusableChildren = ${hasAriaTextNoFocusableChildren.toString()};

        return hasAriaTextNoFocusableChildren();
    `);

    ariaTextNoFocusableChildren.forEach(element => {
        auditResults.push({
            ...ariaErrors[11],
            element: element.outerHTML,
            selector: element.selector,
            helperText: 
                `The element with role="text" contains focusable descendants, which is not allowed. Focusable descendants:${element.focusableDescendants
                .map(descendant => `\n- Focusable element: ${descendant.outerHTML}`)
                .join("")}`
        });
    });
}