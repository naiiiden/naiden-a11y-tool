import { hasEmptyHeadingsWithImagesEval } from "./has-empty-headings-with-images/has-empty-headings-with-images.js";
import { hasEmptyHeadingsEval } from "./has-empty-headings/has-empty-headings.js";
import { hasEmptyOrMissingSummariesEval } from "./has-empty-summaries/has-empty-summaries.js";
import { hasEmptyTableHeadingsEval } from "./has-empty-table-headings/has-empty-table-headings.js";

export async function emptyAudit(auditResults) {
  await hasEmptyHeadingsEval(auditResults);
  await hasEmptyHeadingsWithImagesEval(auditResults);
  await hasEmptyTableHeadingsEval(auditResults);
  await hasEmptyOrMissingSummariesEval(auditResults);
}
