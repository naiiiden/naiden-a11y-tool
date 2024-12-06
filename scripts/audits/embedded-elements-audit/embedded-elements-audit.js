import { hasEmptyIframeTitles } from "./iframe-titles/iframe-titles.js";
import { objectHasAltText } from "./object-has-alt-text/object-has-alt-text.js";

export async function embeddedElementsAudit(auditResults) {
    await hasEmptyIframeTitles(auditResults);
    await objectHasAltText(auditResults);
}