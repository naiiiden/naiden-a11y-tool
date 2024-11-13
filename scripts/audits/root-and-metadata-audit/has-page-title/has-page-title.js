import { rootAndMetadataErrors } from "../../../errors/root-and-metadata.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasPageTitle(auditResults) {
    const documentTitle = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const documentTitle = document.querySelector("title");

        if (documentTitle) {
            return {
                documentTitle: documentTitle.textContent,
                outerHTML: documentTitle.outerHTML,
                selector: getUniqueSelector(documentTitle)
            }
        } else {
            return;
        }
    `);

    if (documentTitle?.documentTitle === "" || !document.documentTitle) {
        auditResults.push({ ...rootAndMetadataErrors[2], element: documentTitle?.outerHTML, selector: documentTitle?.selector });
    }
}