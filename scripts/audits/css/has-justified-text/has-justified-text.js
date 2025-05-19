import { cssErrors } from "../../../errors/css.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasJustifiedText() {
  return Array.from(document.querySelectorAll("*"))
    .filter((element) => {
      if (!isElementVisible(element)) {
        return false;
      }

      const isJustified = window.getComputedStyle(element).textAlign === "justify";
      const isNotLink = element.tagName.toLowerCase() !== "a";

      return isJustified && isNotLink && element.textContent.trim().length > 500;
    })
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasJustifiedTextEval(auditResults) {
  const justifiedText = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasJustifiedText = ${hasJustifiedText.toString()};

    return hasJustifiedText();
  `);

  justifiedText.forEach((element) => {
    auditResults.push({
      ...cssErrors[3],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
