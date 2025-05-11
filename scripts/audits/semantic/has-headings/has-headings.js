import { semanticErrors } from "../../../errors/semantic.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasHeadings() {
  return (
    Array.from(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]'),
    ).filter((heading) => isElementVisible(heading)).length > 0
  );
}

export async function hasHeadingsEval(auditResults) {
  const headings = await inspectedWindowEval(`
    const isElementVisible = ${isElementVisible.toString()};
    const hasHeadings = ${hasHeadings.toString()};

    return hasHeadings();
  `);

  if (!headings) {
    auditResults.push(semanticErrors[3]);
  }
}
