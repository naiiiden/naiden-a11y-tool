import { semanticErrors } from "../../../errors/semantic.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasHeadingLevelOne() {
  const h1 = document.querySelector("h1");
  const ariaH1 = document.querySelector("[role='heading'][aria-level='1']");

  return (h1 && isElementVisible(h1)) || (ariaH1 && isElementVisible(ariaH1));
}

export async function hasHeadingLevelOneEval(auditResults) {
  const hasH1 = await inspectedWindowEval(`
    const isElementVisible = ${isElementVisible.toString()};
    const hasHeadingLevelOne = ${hasHeadingLevelOne.toString()};

    return hasHeadingLevelOne();
  `);

  if (!hasH1) {
    auditResults.push(semanticErrors[0]);
  }
}
