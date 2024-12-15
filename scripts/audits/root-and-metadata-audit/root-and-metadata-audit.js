import { hasHtmlLangAttr} from "./has-html-lang-attr/has-html-lang-attr.js";
import { hasMetaRefresh } from "./has-meta-refresh/has-meta-refresh.js";
import { hasMetaViewportMaximumScale } from "./has-meta-viewport-maximum-scale/has-meta-viewport-maximum-scale.js";
import { hasMetaViewportUserScalableNoOrZero } from "./has-meta-viewport-scalable/has-meta-viewport-scalable.js";
import { hasPageTitle } from "./has-page-title/has-page-title.js";
import { hasValidHtmlLangAttr } from "./has-valid-html-lang-attr/has-valid-html-lang-attr.js";

export async function rootAndMetadataAudit(auditResults) {
    await hasValidHtmlLangAttr(auditResults);
    await hasHtmlLangAttr(auditResults);
    await hasPageTitle(auditResults);
    await hasMetaRefresh(auditResults);
    await hasMetaViewportUserScalableNoOrZero(auditResults);
    await hasMetaViewportMaximumScale(auditResults);
}