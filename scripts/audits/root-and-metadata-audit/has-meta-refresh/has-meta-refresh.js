import { rootAndMetadataErrors } from "../../../errors/root-and-metadata.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export function hasMetaRefresh() {
  const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
  if (!metaRefresh) {
    return;
  }
  const hasContentAttr = metaRefresh.getAttribute("content");

  return {
    hasContentAttr,
    outerHTML: metaRefresh.outerHTML,
    selector: getUniqueSelector(metaRefresh),
  };
}

export async function hasMetaRefreshEval(auditResults) {
  const metaRefresh = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const hasMetaRefresh = ${hasMetaRefresh.toString()};

        return hasMetaRefresh();
    `);

  if (
    metaRefresh &&
    metaRefresh.hasContentAttr &&
    metaRefresh.hasContentAttr.value !== ""
  ) {
    auditResults.push({
      ...rootAndMetadataErrors[3],
      element: metaRefresh.outerHTML,
      selector: metaRefresh.selector,
    });
  }
}
