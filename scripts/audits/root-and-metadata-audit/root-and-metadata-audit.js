import { hasHtmlLangAttr} from "./has-html-lang-attr/has-html-lang-attr.js";
import { hasMetaRefresh } from "./has-meta-refresh/has-meta-refresh.js";
import { hasMetaViewport } from "./has-meta-viewport/has-meta-viewport.js";
import { hasPageTitle } from "./has-page-title/has-page-title.js";
import { hasValidHtmlLangAttr } from "./has-valid-html-lang-attr/has-valid-html-lang-attr.js";

export async function rootAndMetadataAudit(auditResults) {
    await hasValidHtmlLangAttr(auditResults);
    await hasHtmlLangAttr(auditResults);
    await hasPageTitle(auditResults);
    await hasMetaRefresh(auditResults);
    await hasMetaViewport(auditResults);
}