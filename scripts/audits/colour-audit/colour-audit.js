import { colourContrast } from "./colour-contrast/colour-contrast.js";

export async function colourAudit(auditResults) {
    await colourContrast(auditResults);
}