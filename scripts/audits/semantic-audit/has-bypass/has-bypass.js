import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasBypass() {
  const skipLinks = Array.from(document.querySelectorAll('a[href^="#"]'))
    .filter(link => {
      if (!isElementVisible(link)) {
        return false;
      }
  
      const linkText = link.textContent.toLowerCase();
      return linkText.includes('skip') || linkText.includes('jump');
    })
    .map(link => ({
      selector: getUniqueSelector(link),
      outerHTML: link.outerHTML
    }));
  
  return { skipLinks };
}

export async function hasBypassEval(auditResults) {
  const bypass = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasBypass = ${hasBypass.toString()};

    return hasBypass();
  `);

  if (!bypass || bypass.skipLinks.length === 0) {
    auditResults.push(semanticErrors[18]);
  }
}