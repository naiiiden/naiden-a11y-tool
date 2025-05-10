import { semanticErrors } from "../../../errors/semantic.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasMoreThanOneContentinfoLandmark() {
  return Array.from(document.querySelectorAll("[role='contentinfo']")).filter(
    (contentinfo) => isElementVisible(contentinfo),
  ).length;
}

export async function hasMoreThanOneContentinfoLandmarkEval(auditResults) {
  const moreThanOneContentinfoLandmark = await inspectedWindowEval(`
    const isElementVisible = ${isElementVisible.toString()};
    const hasMoreThanOneContentinfoLandmark = ${hasMoreThanOneContentinfoLandmark.toString()};

    return hasMoreThanOneContentinfoLandmark();
  `);

  if (moreThanOneContentinfoLandmark > 1) {
    auditResults.push(semanticErrors[8]);
  }
}
