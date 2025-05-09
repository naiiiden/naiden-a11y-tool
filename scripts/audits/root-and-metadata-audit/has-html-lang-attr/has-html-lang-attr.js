import { rootAndMetadataErrors } from "../../../errors/root-and-metadata.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export function hasHtmlLangAttr() {
  const rootDocument = document.documentElement;
  const hasLangAttr = rootDocument.getAttribute("lang");

  return {
    hasLangAttr,
    outerHTML: rootDocument.cloneNode().outerHTML,
    selector: getUniqueSelector(rootDocument),
  };
}

// https://www.w3.org/WAI/WCAG22/Techniques/html/H57
export async function hasHtmlLangAttrEval(auditResults) {
  const htmlLangAttr = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const hasHtmlLangAttr = ${hasHtmlLangAttr.toString()};
    
        return hasHtmlLangAttr();
    `);

  if (!htmlLangAttr.hasLangAttr) {
    auditResults.push({
      ...rootAndMetadataErrors[0],
      element: htmlLangAttr.outerHTML,
      selector: htmlLangAttr.selector,
    });
  }
}
