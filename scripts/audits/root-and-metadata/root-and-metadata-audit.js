import { hasHtmlLangAttrEval } from "./has-html-lang-attr/has-html-lang-attr.js";
import { hasMetaRefreshEval } from "./has-meta-refresh/has-meta-refresh.js";
import { hasMetaViewportMaximumScaleEval } from "./has-meta-viewport-maximum-scale/has-meta-viewport-maximum-scale.js";
import { hasMetaViewportUserScalableNoOrZeroEval } from "./has-meta-viewport-scalable/has-meta-viewport-scalable.js";
import { hasPageTitleEval } from "./has-page-title/has-page-title.js";
import { hasValidHtmlLangAttrEval } from "./has-valid-html-lang-attr/has-valid-html-lang-attr.js";

export async function rootAndMetadataAudit(auditResults) {
  await hasHtmlLangAttrEval(auditResults);
  await hasValidHtmlLangAttrEval(auditResults);
  await hasMetaRefreshEval(auditResults);
  await hasMetaViewportUserScalableNoOrZeroEval(auditResults);
  await hasMetaViewportMaximumScaleEval(auditResults);
  await hasPageTitleEval(auditResults);
}
