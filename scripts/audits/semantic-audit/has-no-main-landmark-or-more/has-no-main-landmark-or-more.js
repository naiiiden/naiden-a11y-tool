import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasNoMainLandmarkOrMore() {
  return Array.from(document.querySelectorAll("main, [role='main']"))
    .filter((element) => isElementVisible(element))
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasNoMainLandmarkOrMoreEval(auditResults) {
  const mainLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasNoMainLandmarkOrMore = ${hasNoMainLandmarkOrMore.toString()};

        return hasNoMainLandmarkOrMore();
    `);

  if (mainLandmarks.length < 1) {
    auditResults.push(semanticErrors[5]);
  } else if (mainLandmarks.length > 1) {
    mainLandmarks.slice(1).forEach((landmark) => {
      auditResults.push({
        ...semanticErrors[6],
        element: landmark.outerHTML,
        selector: landmark.selector,
      });
    });
  }
}
