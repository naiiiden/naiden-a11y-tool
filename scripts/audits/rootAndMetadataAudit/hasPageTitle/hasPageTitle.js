import { htmlAndHeadErrors } from "../../../errors/rootAndMetadata.js";

export async function hasPageTitle(auditResults) {
    const pageTitle = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval("document.title", resolve);
    });
    
    if (!pageTitle || pageTitle === "") {
        auditResults.push(htmlAndHeadErrors[1]);
    }
}

