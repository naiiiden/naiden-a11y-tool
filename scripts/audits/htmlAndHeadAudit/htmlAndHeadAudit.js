import { htmlAndHeadErrors } from "../../errors/htmlAndHead.js";
import { htmlLanguage } from "./htmlLanguage/htmlLanguage.js";

export async function htmlAndHeadAudit(auditResults) {
    await htmlLanguage(auditResults);

    const pageTitle = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval("document.title", resolve);
    });
    
    if (!pageTitle || pageTitle === "") {
        auditResults.push(htmlAndHeadErrors[1]);
    }

    const metaRefresh = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`document.querySelector('meta[http-equiv="refresh"]')`, resolve);
    })

    if ((metaRefresh && metaRefresh.content) || (metaRefresh && metaRefresh.content !== "")) {
        auditResults.push(htmlAndHeadErrors[2]);
    }

    const metaViewport = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval("document.querySelector('meta[name=\"viewport\"]')?.getAttribute('content')", resolve);
    })

    if (metaViewport && (metaViewport.includes('user-scalable=no') || metaViewport.includes('user-scalable=0'))) {
        auditResults.push(htmlAndHeadErrors[3]);
    }
}