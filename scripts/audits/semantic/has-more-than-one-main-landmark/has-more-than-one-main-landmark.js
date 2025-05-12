import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasMoreThanOneMainLandmark() {
  return Array.from(document.querySelectorAll("main, [role='main']"))
    .filter((element) => isElementVisible(element))
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasMoreThanOneMainLandmarkEval(auditResults) {
  const mainLandmarks = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasMoreThanOneMainLandmark = ${hasMoreThanOneMainLandmark.toString()};

    return hasMoreThanOneMainLandmark();
  `);

  if (mainLandmarks.length > 1) {
    mainLandmarks.slice(1).forEach((landmark) => {
      auditResults.push({
        ...semanticErrors[6],
        element: landmark.outerHTML,
        selector: landmark.selector,
      });
    });
  }
}
