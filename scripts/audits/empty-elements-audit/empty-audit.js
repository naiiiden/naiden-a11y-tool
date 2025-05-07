import { hasEmptyHeadingsWithImages } from "./empty-headings-with-images/empty-headings-with-images.js";
import { hasEmptyHeadingsEval } from "./empty-headings/empty-headings.js";
import { hasEmptyOrMissingSummaries } from "./empty-summaries/empty-summaries.js";
import { hasEmptyTableHeadings } from "./empty-table-headings/empty-table-headings.js";

export async function emptyAudit(auditResults) {
    await hasEmptyHeadingsEval(auditResults);
    await hasEmptyHeadingsWithImages(auditResults);
    await hasEmptyTableHeadings(auditResults);
    await hasEmptyOrMissingSummaries(auditResults);
}