import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaConditionalAttributes(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-conditional-attr
    const ariaConditionalAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            :is(tr, [role='row']):is([aria-posinset]:not([aria-posinset='']), [aria-setsize]:not([aria-setsize='']), [aria-expanded]:not([aria-expanded='']), [aria-level]:not([aria-level=''])):not([role='treegrid'] :is(tr, [role='row'])), 
            input[type='checkbox'][aria-checked]:not([aria-checked=''])
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }))
    `)

    ariaConditionalAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[21], element: element.outerHTML, selector: element.selector });
    });
}