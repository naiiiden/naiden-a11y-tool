import { rootAndMetadataErrors } from "../../../errors/root-and-metadata.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasHtmlLangAttr(auditResults) {
    // const htmlLanguage = await new Promise((resolve) => {
    //     chrome.devtools.inspectedWindow.eval("document.documentElement.getAttribute('lang')", resolve);
    // });

    const htmlLanguage = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const rootDocument = document.documentElement;
        const hasLangAttr = rootDocument.getAttribute('lang');

        return {
            hasLangAttr,
            outerHTML: rootDocument.outerHTML,
            selector: getUniqueSelector(rootDocument)
        }

    `)
    
    if (!htmlLanguage.hasLangAttr) {
        auditResults.push({ ...rootAndMetadataErrors[0], element: htmlLanguage.outerHTML, selector: htmlLanguage.selector });
    }
}

