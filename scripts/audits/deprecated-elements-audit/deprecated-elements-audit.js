import { hasMarquee } from "./has-marquee/has-marquee.js";

export async function deprecatedElementsAudit(auditResults) {
    await hasMarquee(auditResults);
}