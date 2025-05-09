import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

// prettier-ignore
export const ariaRoleProhibitedAttributesList = {
    caption: ["aria-label", "aria-labelledby", "aria-braillelabel"],
    code: ["aria-label", "aria-labelledby", "aria-braillelabel"],
    deletion: ["aria-label", "aria-labelledby", "aria-braillelabel"],
    emphasis: ["aria-label", "aria-labelledby", "aria-braillelabel"],
    generic: ["aria-label", "aria-labelledby", "aria-roledescription"],
    insertion: ["aria-label", "aria-labelledby", "aria-braillelabel", "aria-brailleroledescription"],
    paragraph: ["aria-label", "aria-labelledby", "aria-braillelabel"],
    presentation: ["aria-label", "aria-labelledby"],
    strong: ["aria-label", "aria-labelledby", "aria-braillelabel"],
    subscript: ["aria-label", "aria-labelledby", "aria-braillelabel"],
    superscript: ["aria-label", "aria-labelledby", "aria-braillelabel"],
};

export function hasAriaRoleProhibitedAttributes() {
  return Array.from(
    document.querySelectorAll(
      Object.keys(ariaRoleProhibitedAttributesList)
        .map((role) => `[role='${role}']`)
        .join(", "),
    ),
  )
    .filter((element) => {
      if (!isElementVisible(element)) {
        return false;
      }

      const role = element.getAttribute("role");
      const prohibitedAttributes = ariaRoleProhibitedAttributesList[role];
      return prohibitedAttributes.some((attr) => element.hasAttribute(attr));
    })
    .map((element) => {
      const role = element.getAttribute("role");
      const prohibitedAttributes = ariaRoleProhibitedAttributesList[role];
      const foundAttributes = prohibitedAttributes.filter((attr) =>
        element.hasAttribute(attr),
      );
      return {
        outerHTML: element.outerHTML,
        selector: getUniqueSelector(element),
        prohibitedAttributes: foundAttributes,
      };
    });
}

export async function hasAriaRoleProhibitedAttributesEval(auditResults) {
  // https://dequeuniversity.com/rules/axe/4.10/aria-prohibited-attr
  const ariaRoleProhibitedAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const ariaRoleProhibitedAttributesList = ${JSON.stringify(ariaRoleProhibitedAttributesList)};
        const hasAriaRoleProhibitedAttributes = ${hasAriaRoleProhibitedAttributes.toString()};

        return hasAriaRoleProhibitedAttributes();
    `);

  ariaRoleProhibitedAttributes.forEach((element) => {
    auditResults.push({
      ...ariaErrors[20],
      element: element.outerHTML,
      selector: element.selector,
      helperText: `The element contains prohibited attributes: ${element.prohibitedAttributes.join(", ")}.`,
    });
  });
}
