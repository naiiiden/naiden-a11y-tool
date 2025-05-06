import { rootAndMetadataErrors } from "../../../errors/root-and-metadata.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export function hasPageTitle() {
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
}

export async function hasPageTitleEval(auditResults) {
    const documentTitle = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const hasPageTitle = ${hasPageTitle.toString()};

        return hasPageTitle();
    `);

    if (documentTitle?.documentTitle === "" || !documentTitle) {
        auditResults.push({ ...rootAndMetadataErrors[2], element: documentTitle?.outerHTML, selector: documentTitle?.selector });
    }
}