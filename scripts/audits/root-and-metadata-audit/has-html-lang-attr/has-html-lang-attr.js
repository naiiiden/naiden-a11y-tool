import { rootAndMetadataErrors } from "../../../errors/root-and-metadata.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasHtmlLangAttr(auditResults) {
    const rootDocument = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const rootDocument = document.documentElement;
        const hasLangAttr = rootDocument.getAttribute('lang');

        return {
            hasLangAttr,
            outerHTML: rootDocument.cloneNode().outerHTML,
            selector: getUniqueSelector(rootDocument)
        }
    `)
    
    if (!rootDocument.hasLangAttr) {
        auditResults.push({ ...rootAndMetadataErrors[0], element: rootDocument.outerHTML, selector: rootDocument.selector });
    }
}