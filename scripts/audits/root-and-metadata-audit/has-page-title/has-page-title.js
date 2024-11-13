import { rootAndMetadataErrors } from "../../../errors/root-and-metadata.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasPageTitle(auditResults) {
    const documentTitle = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const documentTitle = document.querySelector("title");

        return {
            documentTitle,
            outerHTML: documentTitle.outerHTML,
            selector: getUniqueSelector(documentTitle)
        }
    `)

    if (documentTitle.documentTitle) {
        auditResults.push({ ...rootAndMetadataErrors[2], element: documentTitle.outerHTML, selector: documentTitle.selector });
    }
}

