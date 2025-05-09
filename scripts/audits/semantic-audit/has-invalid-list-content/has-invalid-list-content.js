import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasInvalidListContent() {
  return Array.from(
    document.querySelectorAll(":is(ul, ol) > :not(li):not(script):not(template)"),
  )
    .filter((element) => isElementVisible(element))
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasInvalidListContentEval(auditResults) {
  const invalidListContent = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasInvalidListContent = ${hasInvalidListContent.toString()};

        return hasInvalidListContent();
    `);

  invalidListContent.forEach((element) => {
    auditResults.push({
      ...semanticErrors[14],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
