import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasAriaToggleFieldNames() {
  return Array.from(
    document.querySelectorAll(
      "[role='checkbox'], [role='menu'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='radio'], [role='radiogroup'], [role='switch']",
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
      const title = element.hasAttribute("title")
        ? element.getAttribute("title").trim()
        : null;

      return (
        element.textContent.trim() === "" &&
        !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title)
      );
    })
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasAriaToggleFieldNamesEval(auditResults) {
  // https://dequeuniversity.com/rules/axe/4.10/aria-toggle-field-name
  const ariaToggleFieldNames = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasAriaToggleFieldNames = ${hasAriaToggleFieldNames.toString()};

    return hasAriaToggleFieldNames();
  `);

  ariaToggleFieldNames.forEach((element) => {
    auditResults.push({
      ...ariaErrors[7],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
