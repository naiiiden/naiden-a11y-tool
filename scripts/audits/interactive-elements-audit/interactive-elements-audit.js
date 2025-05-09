import { hasBrokenSamePageLinksEval } from "./broken-same-page-links/broken-same-page-links.js";
import { hasBrokenSkipLinksEval } from "./broken-skip-links/broken-skip-links.js";
import { hasEmptyButtonsEval } from "./empty-buttons/empty-buttons.js";
import { hasEmptyLinksEval } from "./empty-links/empty-links.js";
import { hasDuplicateAccesskeysEval } from "./has-duplicate-accesskey/has-duplicate-accesskey.js";
import { hasInteractiveControlsWithInteractiveControlsAsChildrenEval } from "./interactive-controls-w-interactive-children/interactive-controls-w-interactive-children.js";
import { scrollableRegionKeyboardAccess } from "./scrollable-region-keyboard-access/scrollable-region-keyboard-access.js";
import { touchTargetSizeEval } from "./touch-target-size/touch-target-size.js";

export async function interactiveElementsAudit(auditResults) {
  await hasEmptyLinksEval(auditResults);
  await hasEmptyButtonsEval(auditResults);
  await hasBrokenSkipLinksEval(auditResults);
  await hasInteractiveControlsWithInteractiveControlsAsChildrenEval(auditResults);
  await hasBrokenSamePageLinksEval(auditResults);
  await hasDuplicateAccesskeysEval(auditResults);
  await touchTargetSizeEval(auditResults);
  await scrollableRegionKeyboardAccess(auditResults);
}
