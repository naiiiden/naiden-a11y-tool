import { embeddedElementsErrors } from "../../../errors/embedded-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasEmptyIframeTitles() {
  return Array.from(document.querySelectorAll("iframe"))
    .filter((iframe) => isElementVisible(iframe))
    .filter(
      (iframe) =>
        !iframe.hasAttribute("title") || iframe.getAttribute("title").trim() === "",
    )
    .map((iframe) => ({
      outerHTML: iframe.outerHTML,
      selector: getUniqueSelector(iframe),
    }));
}

export async function hasEmptyIframeTitlesEval(auditResults) {
  const iframeTitles = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasEmptyIframeTitles = ${hasEmptyIframeTitles.toString()};

    return hasEmptyIframeTitles();
  `);

  iframeTitles.forEach((iframe) => {
    auditResults.push({
      ...embeddedElementsErrors[0],
      element: iframe.outerHTML,
      selector: iframe.selector,
    });
  });
}
