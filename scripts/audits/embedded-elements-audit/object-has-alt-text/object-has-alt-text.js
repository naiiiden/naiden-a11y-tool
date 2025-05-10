import { embeddedElementsErrors } from "../../../errors/embedded-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasObjectAltText() {
  return Array.from(document.querySelectorAll("object"))
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
      const role = element.hasAttribute("role")
        ? element.getAttribute("role").trim()
        : null;

      return (
        !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title) &&
        (!role || (role !== "none" && role !== "presentation"))
      );
    })
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasObjectAltTextEval(auditResults) {
  const objectAltText = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasObjectAltText = ${hasObjectAltText.toString()};

    return hasObjectAltText();
  `);

  objectAltText.forEach((element) => {
    auditResults.push({
      ...embeddedElementsErrors[1],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
