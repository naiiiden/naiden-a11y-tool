import { hasBrokenSamePageLinksEval } from "./has-broken-same-page-links/has-broken-same-page-links.js";
import { hasBrokenSkipLinksEval } from "./has-broken-skip-links/has-broken-skip-links.js";
import { hasEmptyButtonsEval } from "./has-empty-buttons/has-empty-buttons.js";
import { hasEmptyLinksEval } from "./has-empty-links/has-empty-links.js";
import { hasDuplicateAccesskeysEval } from "./has-duplicate-accesskey/has-duplicate-accesskey.js";
import { hasInteractiveControlsWithInteractiveControlsAsChildrenEval } from "./has-interactive-controls-w-interactive-children/has-interactive-controls-w-interactive-children.js";
import { scrollableRegionKeyboardAccess } from "./has-scrollable-region-keyboard-access/has-scrollable-region-keyboard-access.js";
import { hasSufficientTouchTargetSizeEval } from "./has-sufficient-touch-target-size/has-sufficient-touch-target-size.js";

export async function interactiveElementsAudit(auditResults) {
  await hasBrokenSkipLinksEval(auditResults);
  await hasBrokenSamePageLinksEval(auditResults);
  await hasEmptyLinksEval(auditResults);
  await hasEmptyButtonsEval(auditResults);
  await hasInteractiveControlsWithInteractiveControlsAsChildrenEval(auditResults);
  await hasSufficientTouchTargetSizeEval(auditResults);
  await hasDuplicateAccesskeysEval(auditResults);
  await scrollableRegionKeyboardAccess(auditResults);
}
