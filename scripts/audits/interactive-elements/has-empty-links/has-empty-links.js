import { interactiveElementsErrors } from "../../../errors/interactive-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasEmptyLinks() {
  return Array.from(document.querySelectorAll("a:not(:has(img))"))
    .filter((link) => {
      if (!isElementVisible(link)) {
        return false;
      }

      const ariaLabel = link.hasAttribute("aria-label")
        ? link.getAttribute("aria-label").trim()
        : null;
      const ariaLabelledby = link.hasAttribute("aria-labelledby")
        ? document.getElementById(link.getAttribute("aria-labelledby"))
        : null;
      const title = link.hasAttribute("title") ? link.getAttribute("title").trim() : null;

      return (
        link.textContent.trim() === "" &&
        !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title)
      );
    })
    .map((link) => ({
      outerHTML: link.outerHTML,
      selector: getUniqueSelector(link),
    }));
}

export async function hasEmptyLinksEval(auditResults) {
  const emptyLinks = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasEmptyLinks = ${hasEmptyLinks.toString()};

    return hasEmptyLinks();
  `);

  emptyLinks.forEach((link) => {
    auditResults.push({
      ...interactiveElementsErrors[0],
      element: link.outerHTML,
      selector: link.selector,
    });
  });
}
