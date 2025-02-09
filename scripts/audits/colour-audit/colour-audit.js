import { colourContrast } from "./colour-contrast/colour-contrast";

export async function colourAudit(auditResults) {
    await colourContrast(auditResults);
}