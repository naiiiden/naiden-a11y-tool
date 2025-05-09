import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function AriaLabelContentNameMismatch() {
    return Array.from(document.querySelectorAll(":is([role='button'], [role='checkbox'], [role='gridcell'], [role='link'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='option'], [role='radio'], [role='searchbox'], [role='switch'], [role='tab'], [role='treeitem'])[aria-label]:not([aria-label=''])"))
        .filter(element => {
            if (!isElementVisible(element)) {
                return false;
            }
    
            const elementTextContent = element.textContent.trim().toLowerCase();
            const elementAriaLabel = element.getAttribute("aria-label");
            return !elementAriaLabel.includes(elementTextContent);
        })
        .map(element => ({
            outerHTML: element.outerHTML,
            selector: getUniqueSelector(element)
        }));
}

export async function hasAriaLabelContentNameMismatchEval(auditResults) {
    const ariaLabelContentNameMismatch = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const AriaLabelContentNameMismatch = ${AriaLabelContentNameMismatch.toString()};

        return AriaLabelContentNameMismatch();
    `) 
    
    ariaLabelContentNameMismatch.forEach(element => {
        auditResults.push({
            ...ariaErrors[23],
            element: element.outerHTML,
            selector: element.selector
        });
    });
}