import { rootAndMetadataErrors } from "../../../errors/root-and-metadata.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasMetaViewportUserScalableNoOrZero(auditResults) {
    const metaViewport = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const metaViewport = document.querySelector('meta[name=\"viewport\"]');
        const hasContentAttr = metaViewport.getAttribute('content');

        return {
            hasContentAttr,
            outerHTML: metaViewport.outerHTML,
            selector: getUniqueSelector(metaViewport)
        }
    `)

    if (metaViewport.hasContentAttr && (metaViewport.hasContentAttr.includes('user-scalable=no') || metaViewport.hasContentAttr.includes('user-scalable=0'))) {
        auditResults.push({... rootAndMetadataErrors[4], element: metaViewport.outerHTML, selector: metaViewport.selector });
    }
}
