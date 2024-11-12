import { rootAndMetadataErrors } from "../../../errors/root-and-metadata.js";

export async function hasMetaRefresh(auditResults) {
    const metaRefresh = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`document.querySelector('meta[http-equiv="refresh"]')`, resolve);
    })

    if ((metaRefresh && metaRefresh.content) || (metaRefresh && metaRefresh.content !== "")) {
        auditResults.push(rootAndMetadataErrors[3]);
    }
}

