import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasAriaDeprecatedRoles() {
    return Array.from(document.querySelectorAll("[role='directory']"))
        .filter(element => isElementVisible(element))
        .map(element => ({
            outerHTML: element.outerHTML,
            selector: getUniqueSelector(element)
        }));
}

export async function hasAriaDeprecatedRolesEval(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-deprecated-role
    const ariaDeprecatedRoles = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasAriaDeprecatedRoles = ${hasAriaDeprecatedRoles.toString()};

        return hasAriaDeprecatedRoles();
    `)

    ariaDeprecatedRoles.forEach(element => {
        auditResults.push({ ...ariaErrors[5], element: element.outerHTML, selector: element.selector });
    });
}