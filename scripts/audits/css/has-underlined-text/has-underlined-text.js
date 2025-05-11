import { cssErrors } from "../../../errors/css.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasUnderlinedText() {
  return Array.from(document.querySelectorAll("*"))
    .filter((element) => {
      if (!isElementVisible(element)) {
        return false;
      }

      const isUnderlined =
        window.getComputedStyle(element).textDecorationLine === "underline";
      const isExplicitUElement = element.tagName.toLowerCase() === "u";
      const isNotLink = element.tagName.toLowerCase() !== "a";

      return (
        (isUnderlined || isExplicitUElement) &&
        isNotLink &&
        element.textContent.trim().length > 0
      );
    })
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasUnderlinedTextEval(auditResults) {
  const underlinedText = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasUnderlinedText = ${hasUnderlinedText.toString()};

    return hasUnderlinedText();
  `);

  underlinedText.forEach((element) => {
    auditResults.push({
      ...cssErrors[1],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
