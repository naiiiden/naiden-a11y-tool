import { hasUnadjustableTextProperties } from "./has-unadjustable-text-properties/has-unadjustable-text-properties.js";
import { hasUnderlinedText } from "./has-underlined-text/has-underlined-text.js";
import { hasVerySmallText } from "./has-very-small-text/has-very-small-text.js";

export async function cssAudit(auditResults) {
    await hasVerySmallText(auditResults);
    await hasUnderlinedText(auditResults);
    await hasUnadjustableTextProperties(auditResults);
}