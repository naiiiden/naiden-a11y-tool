import { hasEmptyHeadingsWithImagesEval } from "./empty-headings-with-images/empty-headings-with-images.js";
import { hasEmptyHeadingsEval } from "./empty-headings/empty-headings.js";
import { hasEmptyOrMissingSummariesEval } from "./empty-summaries/empty-summaries.js";
import { hasEmptyTableHeadingsEval } from "./empty-table-headings/empty-table-headings.js";

export async function emptyAudit(auditResults) {
  await hasEmptyHeadingsEval(auditResults);
  await hasEmptyHeadingsWithImagesEval(auditResults);
  await hasEmptyTableHeadingsEval(auditResults);
  await hasEmptyOrMissingSummariesEval(auditResults);
}
