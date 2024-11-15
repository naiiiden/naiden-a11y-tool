import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaValidAttributes(auditResults) {
    const ariaValidAttributesArray = [
        'aria-activedescendant', 'aria-atomic', 'aria-autocomplete', 'aria-busy', 'aria-checked', 'aria-colcount',
        'aria-colindex', 'aria-colspan', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
        'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-expanded', 'aria-flowto', 'aria-grabbed', 
        'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 
        'aria-level', 'aria-live', 'aria-modal', 'aria-multiline', 'aria-multiselectable', 'aria-orientation', 
        'aria-owns', 'aria-placeholder', 'aria-posinset', 'aria-pressed', 'aria-readonly', 'aria-relevant', 
        'aria-required', 'aria-roledescription', 'aria-rowcount', 'aria-rowindex', 'aria-rowspan', 'aria-selected', 
        'aria-setsize', 'aria-sort', 'aria-valuemax', 'aria-valuemin', 'aria-valuenow', 'aria-valuetext'
    ];

    // https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr
    const ariaValidAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('*'))
            .flatMap(element => 
                Array.from(element.attributes)
                    .filter(attr => attr.name.startsWith('aria') && !${JSON.stringify(ariaValidAttributesArray)}.includes(attr.name))
                    .map(attr => ({
                        outerHTML: element.outerHTML,
                        selector: getUniqueSelector(element)
                    }))
        );
    `);

    ariaValidAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[15], element: element.outerHTML, selector: element.selector });
    });
}