import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasBypass(auditResults) {
  const hasBypass = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const skipLinks = Array.from(document.querySelectorAll('a[href^="#"]')).filter(link => {
      const linkText = link.innerText.toLowerCase();
      return linkText.includes('skip') || linkText.includes('jump');
    });

    return { skipLinks };
  `);

  if (hasBypass.skipLinks.length === 0) {
    auditResults.push(semanticErrors[18]);
  }
}