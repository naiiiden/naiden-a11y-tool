import { hasEmptyIframeTitles } from "./iframe-titles/iframe-titles.js";

export async function embeddedElementsAudit(auditResults) {
    await hasEmptyIframeTitles(auditResults);
}