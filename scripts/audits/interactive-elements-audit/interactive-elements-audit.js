import { hasBrokenSamePageLinks } from "./broken-same-page-links/broken-same-page-links.js";
import { hasBrokenSkipLinks } from "./broken-skip-links/broken-skip-links.js";
import { hasEmptyButtons } from "./empty-buttons/empty-buttons.js";
import { hasEmptyLinks } from "./empty-links/empty-links.js";
import { hasDuplicateAccesskeys } from "./has-duplicate-accesskey/has-duplicate-accesskey.js";
import { hasInteractiveControlsWithInteractiveControlsAsChildren } from "./interactive-controls-w-interactive-children/interactive-controls-w-interactive-children.js";
import { scrollableRegionKeyboardAccess } from "./scrollable-region-keyboard-access/scrollable-region-keyboard-access.js";
import { touchTargetSize } from "./touch-target-size/touch-target-size.js";

export async function interactiveElementsAudit(auditResults) {
    await hasEmptyLinks(auditResults);
    await hasEmptyButtons(auditResults);
    await hasBrokenSkipLinks(auditResults);
    await hasInteractiveControlsWithInteractiveControlsAsChildren(auditResults);
    await hasBrokenSamePageLinks(auditResults);
    await hasDuplicateAccesskeys(auditResults);
    await touchTargetSize(auditResults);
    await scrollableRegionKeyboardAccess(auditResults);
}