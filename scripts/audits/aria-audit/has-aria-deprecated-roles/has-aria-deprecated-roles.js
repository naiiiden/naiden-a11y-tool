import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasAriaDeprecatedRoles(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-deprecated-role
    const ariaDeprecatedRoles = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='directory']"))
        .map(element => ({
            outerHTML: element.outerHTML,
            selector: getUniqueSelector(element)
        }));
    `)

    ariaDeprecatedRoles.forEach(element => {
        auditResults.push({ ...ariaErrors[5], element: element.outerHTML, selector: element.selector });
    });
}