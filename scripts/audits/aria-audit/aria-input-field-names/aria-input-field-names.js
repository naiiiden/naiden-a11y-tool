import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasAriaInputFieldNames() {
  return Array.from(
    document.querySelectorAll(
      "[role='combobox'], [role='listbox'], [role='searchbox'], [role='slider'], [role='spinbutton'], [role='textbox']",
    ),
  )
    .filter((element) => {
      if (!isElementVisible(element)) {
        return false;
      }

      const ariaLabel = element.hasAttribute("aria-label")
        ? element.getAttribute("aria-label").trim()
        : null;
      const ariaLabelledby = element.hasAttribute("aria-labelledby")
        ? document.getElementById(element.getAttribute("aria-labelledby"))
        : null;

      return !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()));
    })
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasAriaInputFieldNamesEval(auditResults) {
  // https://dequeuniversity.com/rules/axe/4.10/aria-input-field-name
  const ariaInputFieldNames = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasAriaInputFieldNames = ${hasAriaInputFieldNames.toString()};

        return hasAriaInputFieldNames();
    `);

  ariaInputFieldNames.forEach((element) => {
    auditResults.push({
      ...ariaErrors[6],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
