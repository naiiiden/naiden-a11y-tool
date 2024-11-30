import { hasEmptyIframeTitles } from "./iframe-titles/iframe-titles.js";

export async function iframeAudit(auditResults) {
    await hasEmptyIframeTitles(auditResults);
}