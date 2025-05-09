import { formErrors } from "../../../errors/forms.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasVisibleFormControlLabels() {
  return Array.from(
    document.querySelectorAll(
      ':is(input, select, textarea, input[id]:not(:is([type="submit"], [type="button"], [type="reset"], [type="hidden"])), select[id], textarea[id]):is([title]:not([title=""]), [aria-describedby]:not([aria-describedby=""]))',
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
      const hasAriaLabel =
        ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim());

      return labelCount === 0 && !hasWrappingLabelWithText && !hasAriaLabel;
    })
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasVisibleFormControlLabelsEval(auditResults) {
  const visibleFormControlLabels = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasVisibleFormControlLabels = ${hasVisibleFormControlLabels.toString()};

        return hasVisibleFormControlLabels();
    `);

  visibleFormControlLabels.forEach((element) => {
    auditResults.push({
      ...formErrors[7],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
