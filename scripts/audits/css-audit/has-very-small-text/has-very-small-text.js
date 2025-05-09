import { cssErrors } from "../../../errors/css.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasVerySmallText() {
  return Array.from(document.querySelectorAll("*"))
    .filter((element) => {
      if (!isElementVisible(element)) {
        return false;
      }

      const computedStyle = window.getComputedStyle(element);
      const fontSize = parseFloat(computedStyle.fontSize);
      return fontSize > 0 && fontSize <= 10 && element.textContent.trim().length > 0;
    })
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
      fontSize: window.getComputedStyle(element).fontSize,
    }));
}

export async function hasVerySmallTextEval(auditResults) {
  const verySmallText = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasVerySmallText = ${hasVerySmallText.toString()};

        return hasVerySmallText();
    `);

  verySmallText.forEach((element) => {
    auditResults.push({
      ...cssErrors[0],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
