import { hasMetaRefresh } from "./hasMetaRefresh/hasMetaRefresh.js";
import { hasMetaViewport } from "./hasMetaViewport/hasMetaViewport.js";
import { hasPageTitle } from "./hasPageTitle/hasPageTitle.js";
import { hasValidHtmlLanguage } from "./hasValidHtmlLanguage/hasValidHtmlLanguage.js";

export async function rootAndMetadataAudit(auditResults) {
    await hasValidHtmlLanguage(auditResults);
    await hasPageTitle(auditResults);
    await hasMetaRefresh(auditResults);
    await hasMetaViewport(auditResults);
}