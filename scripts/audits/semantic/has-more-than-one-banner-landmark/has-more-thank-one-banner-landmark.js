import { semanticErrors } from "../../../errors/semantic.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasMoreThanOneBannerLandmark() {
  return Array.from(document.querySelectorAll("[role='banner']")).filter((banner) =>
    isElementVisible(banner),
  ).length;
}

export async function hasMoreThanOneBannerLandmarkEval(auditResults) {
  const moreThanOneBannerLandmark = await inspectedWindowEval(`
    const isElementVisible = ${isElementVisible.toString()};
    const hasMoreThanOneBannerLandmark = ${hasMoreThanOneBannerLandmark.toString()};

    return hasMoreThanOneBannerLandmark();
  `);

  if (moreThanOneBannerLandmark > 1) {
    auditResults.push(semanticErrors[7]);
  }
}
