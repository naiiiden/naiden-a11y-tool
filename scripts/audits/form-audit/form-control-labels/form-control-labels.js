import { formErrors } from "../../../errors/forms.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasFormControlLabels() {
  return Array.from(
    document.querySelectorAll(
      'input, select, textarea, input[id]:not(:is([type="submit"], [type="button"], [type="reset"], [type="hidden"])), select[id], textarea[id]',
    ),
  )
    .filter((element) => {
      if (!isElementVisible(element)) {
        return false;
      }

      const labelCount = document.querySelectorAll(
        'label[for="' + element.id + '"]',
      ).length;
      const wrappingLabel = element.closest("label");
      const hasWrappingLabelWithText =
        wrappingLabel && wrappingLabel.textContent.trim().length > 0;
      const ariaLabel = element.hasAttribute("aria-label")
        ? element.getAttribute("aria-label").trim()
        : null;
      const ariaLabelledby = element.hasAttribute("aria-labelledby")
        ? document.getElementById(element.getAttribute("aria-labelledby"))
        : null;
      const title = element.hasAttribute("title")
        ? element.getAttribute("title").trim()
        : null;
      const hasAriaLabel =
        ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim());

      if (
        (labelCount === 0 && !title && !hasWrappingLabelWithText && !hasAriaLabel) ||
        labelCount > 1
      ) {
        return true;
      }
      return false;
    })
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
      labelCount: document.querySelectorAll('label[for="' + element.id + '"]').length,
    }));
}

export async function hasFormControlLabelsEval(auditResults) {
  const formControlLabels = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasFormControlLabels = ${hasFormControlLabels.toString()};

    return hasFormControlLabels();
  `);

  formControlLabels.forEach((element) => {
    if (element.labelCount === 0) {
      auditResults.push({
        ...formErrors[1],
        element: element.outerHTML,
        selector: element.selector,
      });
    } else if (element.labelCount > 1) {
      auditResults.push({
        ...formErrors[2],
        element: element.outerHTML,
        selector: element.selector,
      });
    }
  });
}
