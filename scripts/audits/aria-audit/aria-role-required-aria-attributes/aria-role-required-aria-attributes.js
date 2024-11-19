import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaRoleRequiredAriaAttributes(auditResults) {
    const ariaRoleRequiredAriaAttributesList = {
        checkbox: ["aria-checked"],
        combobox: ["aria-controls", "aria-expanded"],
        heading: ["aria-level"],
        meter: ["aria-valuenow"],
        menuitemcheckbox: ["aria-checked"],
        option: ["aria-selected"],
        radio: ["aria-checked"],
        scrollbar: ["aria-controls", "aria-valuenow"],
        separator: ["aria-valuenow"],
        slider: ["aria-valuenow"],
        switch: ["aria-checked"],
    }

    // https://dequeuniversity.com/rules/axe/4.10/aria-required-attr
    const ariaRoleRequiredAriaAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const ariaRoleRequiredAriaAttributesList = ${JSON.stringify(ariaRoleRequiredAriaAttributesList)};

        return Array.from(document.querySelectorAll(
            Object.entries(ariaRoleRequiredAriaAttributesList)
                .map(([role, attrs]) => "[role='" + role + "']:not(" + attrs.map(attr => "[" + attr + "]").join(", ") + ")")
                .join(", ")
        )).map(element => {
            const role = element.getAttribute("role");
            const requiredAttributes = ariaRoleRequiredAriaAttributesList[role];
            const missingAttributes = requiredAttributes.filter(attr => !element.hasAttribute(attr));
            return {
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element),
                missingAttributes
            };
        });
    `)

    ariaRoleRequiredAriaAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[17], element: element.outerHTML, selector: element.selector, message: `The element is missing the following required attributes: ${element.missingAttributes.join(", ")}.` });
    });
}