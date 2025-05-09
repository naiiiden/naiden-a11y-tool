import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export const ariaValidAttributesArray = [
    'aria-activedescendant', 'aria-atomic', 'aria-autocomplete', 'aria-busy', 'aria-checked', 'aria-colcount',
    'aria-colindex', 'aria-colspan', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
    'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-expanded', 'aria-flowto', 'aria-grabbed', 
    'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 
    'aria-level', 'aria-live', 'aria-modal', 'aria-multiline', 'aria-multiselectable', 'aria-orientation', 
    'aria-owns', 'aria-placeholder', 'aria-posinset', 'aria-pressed', 'aria-readonly', 'aria-relevant', 
    'aria-required', 'aria-roledescription', 'aria-rowcount', 'aria-rowindex', 'aria-rowspan', 'aria-selected', 
    'aria-setsize', 'aria-sort', 'aria-valuemax', 'aria-valuemin', 'aria-valuenow', 'aria-valuetext'
];

export function hasAriaValidAttributes() {
    return Array.from(document.querySelectorAll('*'))
        .filter(element => isElementVisible(element))
        .map(element => {
            const invalidAttributes = Array.from(element.attributes)
                .filter(attr => attr.name.startsWith('aria') && !ariaValidAttributesArray.includes(attr.name))
                .map(attr => ({
                    attribute: attr.name,
                    value: attr.value
                }));
    
            if (invalidAttributes.length > 0) {
                return {
                    outerHTML: element.outerHTML,
                    selector: getUniqueSelector(element),
                    invalidAttributes
                };
            }
    
            return null;
        })
        .filter(result => result !== null);
}

export async function hasAriaValidAttributesEval(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr
    const ariaValidAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const ariaValidAttributesArray = ${JSON.stringify(ariaValidAttributesArray)};
        const hasAriaValidAttributes = ${hasAriaValidAttributes.toString()};

        return hasAriaValidAttributes();
    `);

    ariaValidAttributes.forEach(element => {
        auditResults.push({
            ...ariaErrors[15],
            element: element.outerHTML,
            selector: element.selector,
            helperText: `The element contains unrecognized ARIA attributes: ${element.invalidAttributes.map(attr => `${attr.attribute}`).join(", ")}. Ensure these attributes are spelled correctly and are valid ARIA attributes.`
        });
    });
}