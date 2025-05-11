import { formErrors } from "../../../errors/forms.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasEmptySubmitButonOrResetInputValues() {
  return Array.from(
    document.querySelectorAll(
      'input[type="button"], input[type="submit"], input[type="reset"]',
    ),
  )
    .filter((input) => {
      if (!isElementVisible(input)) {
        return false;
      }

      const inputType = input.getAttribute("type");
      const value = input.getAttribute("value");
      const ariaLabel = input.hasAttribute("aria-label")
        ? input.getAttribute("aria-label").trim()
        : null;
      const ariaLabelledby = input.hasAttribute("aria-labelledby")
        ? document.getElementById(input.getAttribute("aria-labelledby"))
        : null;
      const title = input.hasAttribute("title")
        ? input.getAttribute("title").trim()
        : null;

      if (inputType === "submit" || inputType === "reset") {
        return (
          value === "" &&
          !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title)
        );
      }

      return (
        (!value || value === "") &&
        !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title)
      );
    })
    .map((input) => ({
      outerHTML: input.outerHTML,
      selector: getUniqueSelector(input),
    }));
}

export async function hasEmptySubmitButonOrResetInputValuesEval(auditResults) {
  const emptySubmitButtonOrResetInputValues = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasEmptySubmitButonOrResetInputValues = ${hasEmptySubmitButonOrResetInputValues.toString()};

    return hasEmptySubmitButonOrResetInputValues();
  `);

  emptySubmitButtonOrResetInputValues.forEach((control) => {
    auditResults.push({
      ...formErrors[5],
      element: control.outerHTML,
      selector: control.selector,
    });
  });
}
