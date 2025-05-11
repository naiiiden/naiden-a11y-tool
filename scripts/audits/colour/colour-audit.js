import { hasInsufficientColourContrastEval } from "./has-insufficient-colour-contrast/has-insufficient-colour-contrast.js";

export async function colourAudit(auditResults) {
  await hasInsufficientColourContrastEval(auditResults);
}
