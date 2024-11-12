import { rootAndMetadataErrors } from "../../../errors/root-and-metadata.js";

export async function hasHtmlLangAttr(auditResults) {
    const htmlLanguage = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval("document.documentElement.getAttribute('lang')", resolve);
    });
    
    if (!htmlLanguage) {
        auditResults.push(rootAndMetadataErrors[0]);
    }
}

