import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaConditionalAttributes(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-conditional-attr
    const ariaConditionalAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            input[type='checkbox'][aria-checked]:not([aria-checked=''])
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }))
    `)

    ariaConditionalAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[22], element: element.outerHTML, selector: element.selector });
    });
}