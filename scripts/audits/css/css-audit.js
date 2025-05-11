import { hasUnadjustableTextPropertiesEval } from "./has-unadjustable-text-properties/has-unadjustable-text-properties.js";
import { hasUnderlinedTextEval } from "./has-underlined-text/has-underlined-text.js";
import { hasVerySmallTextEval } from "./has-very-small-text/has-very-small-text.js";

export async function cssAudit(auditResults) {
  await hasVerySmallTextEval(auditResults);
  await hasUnderlinedTextEval(auditResults);
  await hasUnadjustableTextPropertiesEval(auditResults);
}
