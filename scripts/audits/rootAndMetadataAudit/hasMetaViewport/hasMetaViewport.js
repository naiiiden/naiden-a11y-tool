import { htmlAndHeadErrors } from "../../../errors/rootAndMetadata.js";

export async function hasMetaViewport(auditResults) {
    const metaViewport = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval("document.querySelector('meta[name=\"viewport\"]')?.getAttribute('content')", resolve);
    })

    if (metaViewport && (metaViewport.includes('user-scalable=no') || metaViewport.includes('user-scalable=0'))) {
        auditResults.push(htmlAndHeadErrors[3]);
    }
}

