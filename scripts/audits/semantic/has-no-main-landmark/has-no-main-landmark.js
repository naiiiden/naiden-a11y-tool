import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasNoMainLandmark() {
  return Array.from(document.querySelectorAll("main, [role='main']"))
    .filter((element) => isElementVisible(element))
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasNoMainLandmarkEval(auditResults) {
  const mainLandmarks = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasNoMainLandmark = ${hasNoMainLandmark.toString()};

    return hasNoMainLandmark();
  `);

  if (mainLandmarks.length < 1) {
    auditResults.push(semanticErrors[5]);
  }
}