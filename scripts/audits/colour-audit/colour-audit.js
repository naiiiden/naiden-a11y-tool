import { hasInsufficientColourContrast } from "./colour-contrast/colour-contrast.js";

export async function colourAudit(auditResults) {
    await hasInsufficientColourContrast(auditResults);
}