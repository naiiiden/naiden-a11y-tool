import { rootAndMetadataErrors } from "../../../errors/root-and-metadata.js";

export async function hasMetaViewport(auditResults) {
    const metaViewport = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval("document.querySelector('meta[name=\"viewport\"]')?.getAttribute('content')", resolve);
    })

    if (metaViewport && (metaViewport.includes('user-scalable=no') || metaViewport.includes('user-scalable=0'))) {
        auditResults.push(rootAndMetadataErrors[4]);
    }
}

