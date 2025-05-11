import { hasMarqueeEval } from "./has-marquee/has-marquee.js";

export async function deprecatedElementsAudit(auditResults) {
  await hasMarqueeEval(auditResults);
}
