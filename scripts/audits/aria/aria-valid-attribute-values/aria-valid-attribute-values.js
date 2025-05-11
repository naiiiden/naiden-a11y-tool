import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export const ariaAttributesValidValuesList = {
  "aria-activedescendant": "id",
  "aria-colcount": "integer",
  "aria-colindex": "integer",
  "aria-colspan": "integer",
  "aria-controls": "id",
  "aria-describedby": "id",
  "aria-details": "id",
  "aria-errormessage": "id",
  "aria-flowto": "id",
  "aria-labelledby": "id",
  "aria-level": "integer",
  "aria-owns": "id",
  "aria-posinset": "integer",
  "aria-rowcount": "integer",
  "aria-rowindex": "integer",
  "aria-rowspan": "integer",
  "aria-setsize": "integer",
  "aria-valuemax": "number",
  "aria-valuemin": "number",
  "aria-valuenow": "number",
  "aria-valuetext": "number",
  "aria-atomic": ["true", "false"],
  "aria-busy": ["true", "false"],
  "aria-current": ["page", "step", "location", "date", "time"],
  "aria-disabled": ["true", "false"],
  "aria-dropeffect": ["copy", "execute", "link", "move", "none", "popup"],
  "aria-grabbed": ["true", "false", "undefined"],
  "aria-haspopup": ["true", "false", "menu", "listbox", "tree", "grid", "dialog"],
  "aria-hidden": ["true", "false", "undefined"],
  "aria-invalid": ["true", "false", "grammar", "spelling"],
  "aria-live": ["off", "assertive", "polite"],
  "aria-relevant": ["additions", "additions text", "all", "removals", "text"],
  "aria-autocomplete": ["inline", "list", "both", "none"],
  "aria-checked": ["true", "false", "mixed", "undefined"],
  "aria-expanded": ["true", "false", "undefined"],
  "aria-modal": ["true", "false"],
  "aria-multiline": ["true", "false"],
  "aria-multiselectable": ["true", "false"],
  "aria-orientation": ["horizontal", "vertical", "undefined"],
  "aria-pressed": ["true", "false", "mixed", "undefined"],
  "aria-readonly": ["true", "false"],
  "aria-required": ["true", "false"],
  "aria-selected": ["true", "false", "undefined"],
  "aria-sort": ["ascending", "descending", "none", "other"],
};

export function hasAriaValidAttributeValues() {
  return Array.from(
    document.querySelectorAll(
      Object.keys(ariaAttributesValidValuesList)
        .map((attr) => `[${attr}]`)
        .join(", "),
    ),
  )
    .map((element) => {
      const invalidAttributes = Object.entries(ariaAttributesValidValuesList)
        .map(([attr, validValues]) => {
          const attrValue = element.getAttribute(attr);
          if (attrValue === null || attrValue.trim() === "") return null;

          if (validValues === "id") {
            const ids = attrValue
              .trim()
              .split(" ")
              .map((id) => id.trim())
              .filter((id) => id);
            for (const id of ids) {
              if (document.getElementById(id)) {
                return null;
              }
            }
            return {
              attribute: attr,
              value: attrValue,
              validValues: "one or more valid ID references",
            };
          } else if (validValues === "integer") {
            const parsedValue = parseInt(attrValue, 10);
            if (
              isNaN(parsedValue) ||
              parsedValue <= 0 ||
              parsedValue.toString() !== attrValue
            ) {
              return {
                attribute: attr,
                value: attrValue,
                validValues: "a positive integer (greater than zero, no decimals)",
              };
            }
            return null;
          } else if (validValues === "number") {
            const parsedValue = parseFloat(attrValue);
            if (isNaN(parsedValue) || parsedValue.toString() !== attrValue) {
              return {
                attribute: attr,
                value: attrValue,
                validValues: "a valid number (can be negative or decimal)",
              };
            }
            return null;
          } else if (Array.isArray(validValues)) {
            return !validValues.includes(attrValue)
              ? { attribute: attr, value: attrValue, validValues }
              : null;
          }

          return null;
        })
        .filter((attrError) => attrError !== null);

      if (invalidAttributes.length > 0) {
        return {
          outerHTML: element.outerHTML,
          selector: getUniqueSelector(element),
          invalidAttributes,
        };
      }
      return null;
    })
    .filter((result) => result !== null);
}

export async function hasAriaValidAttributeValuesEval(auditResults) {
  // https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr-value
  const ariaAttributesValidValues = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const ariaAttributesValidValuesList = ${JSON.stringify(ariaAttributesValidValuesList)};
    const hasAriaValidAttributeValues = ${hasAriaValidAttributeValues.toString()};

    return hasAriaValidAttributeValues();
  `);

  ariaAttributesValidValues.forEach((element) => {
    auditResults.push({
      ...ariaErrors[14],
      element: element.outerHTML,
      selector: element.selector,
      helperText: element.invalidAttributes
        .map(
          (attrInfo) =>
            `The attribute "${attrInfo.attribute}" has an invalid value "${attrInfo.value}". ${Array.isArray(attrInfo.validValues) ? `Valid values are: ${attrInfo.validValues.join(", ")}.` : attrInfo.validValues}`,
        )
        .join(" "),
    });
  });
}
