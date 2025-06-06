import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasInvalidDtDdElements() {
  return Array.from(document.querySelectorAll("dt:not(dl dt), dd:not(dl dd)"))
    .filter((element) => isElementVisible(element))
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasInvalidDtDdElementsEval(auditResults) {
  const invalidDtDdElements = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasInvalidDtDdElements = ${hasInvalidDtDdElements.toString()};

    return hasInvalidDtDdElements();
  `);

  invalidDtDdElements.forEach((element) => {
    auditResults.push({
      ...semanticErrors[17],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
