import { rootAndMetadataErrors } from "../../../errors/root-and-metadata.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasMetaRefresh(auditResults) {
    const metaRefresh = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
        const hasContentAttr = metaRefresh.getAttribute('content');

        return {
            hasContentAttr,
            outerHTML: metaRefresh.outerHTML,
            selector: getUniqueSelector(metaRefresh)
        }
    `)

    if ((metaRefresh && metaRefresh.content) || (metaRefresh && metaRefresh.content !== "")) {
        auditResults.push({... rootAndMetadataErrors[3], element: metaRefresh.outerHTML, selector: metaRefresh.selector });
    }
}