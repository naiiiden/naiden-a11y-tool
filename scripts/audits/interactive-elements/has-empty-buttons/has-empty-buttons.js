import { interactiveElementsErrors } from "../../../errors/interactive-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasEmptyButtons() {
  return Array.from(document.querySelectorAll("button:not(:has(img))"))
    .filter((button) => {
      if (!isElementVisible(button)) {
        return false;
      }

      const ariaLabel = button.hasAttribute("aria-label")
        ? button.getAttribute("aria-label").trim()
        : null;
      const ariaLabelledby = button.hasAttribute("aria-labelledby")
        ? document.getElementById(button.getAttribute("aria-labelledby"))
        : null;
      const title = button.hasAttribute("title")
        ? button.getAttribute("title").trim()
        : null;
      const tabIndex = button.hasAttribute("tabindex")
        ? button.getAttribute("tabindex").trim() === "-1"
        : null;
      const rolePresentationOrNone = button.hasAttribute("role")
        ? button.getAttribute("role").trim() === "presentation" ||
          button.getAttribute("role").trim() === "none"
        : null;

      return (
        (button.textContent.trim() === "" || tabIndex || rolePresentationOrNone) &&
        !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title)
      );
    })
    .map((button) => ({
      outerHTML: button.outerHTML,
      selector: getUniqueSelector(button),
    }));
}

export async function hasEmptyButtonsEval(auditResults) {
  const emptyButtons = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasEmptyButtons = ${hasEmptyButtons.toString()};

    return hasEmptyButtons();
  `);

  emptyButtons.forEach((button) => {
    auditResults.push({
      ...interactiveElementsErrors[1],
      element: button.outerHTML,
      selector: button.selector,
    });
  });
}
