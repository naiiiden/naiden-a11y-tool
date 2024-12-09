import { hasVerySmallText } from "./has-very-small-text/has-very-small-text.js";

export async function cssAudit(auditResults) {
    await hasVerySmallText(auditResults);
}