import { rootAndMetadataErrors } from "../../../errors/root-and-metadata.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasMetaViewportMaximumScale(auditResults) {
    const metaViewport = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const metaViewport = document.querySelector('meta[name="viewport"]');
        const hasContentAttr = metaViewport.getAttribute('content');

        return {
            hasContentAttr,
            outerHTML: metaViewport.outerHTML,
            selector: getUniqueSelector(metaViewport)
        };
    `);

    if (metaViewport && metaViewport.hasContentAttr) {
        const maxScaleMatch = metaViewport.hasContentAttr.match(/maximum-scale\s*=\s*([\d.]+)/i);

        if (maxScaleMatch && parseFloat(maxScaleMatch[1]) < 5.0) {
            auditResults.push({ ...rootAndMetadataErrors[5], element: metaViewport.outerHTML, selector: metaViewport.selector });
        }
    }
}