import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasAriaTooltipNames() {
  return Array.from(document.querySelectorAll("[role='tooltip']"))
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

export async function hasAriaTooltipNamesEval(auditResults) {
  // https://dequeuniversity.com/rules/axe/4.10/aria-tooltip-name
  const ariaTooltipNames = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasAriaTooltipNames = ${hasAriaTooltipNames.toString()};

        return hasAriaTooltipNames();
    `);

  ariaTooltipNames.forEach((element) => {
    auditResults.push({
      ...ariaErrors[4],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
