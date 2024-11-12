import { hasHtmlLanguage } from "./has-html-lang/has-html-lang.js";
import { hasMetaRefresh } from "./has-meta-refresh/has-meta-refresh.js";
import { hasMetaViewport } from "./has-meta-viewport/has-meta-viewport.js";
import { hasPageTitle } from "./has-page-title/has-page-title.js";
import { hasValidHtmlLanguage } from "./has-valid-html-lang/has-valid-html-lang.js";

export async function rootAndMetadataAudit(auditResults) {
    await hasValidHtmlLanguage(auditResults);
    await hasHtmlLanguage(auditResults);
    await hasPageTitle(auditResults);
    await hasMetaRefresh(auditResults);
    await hasMetaViewport(auditResults);
}