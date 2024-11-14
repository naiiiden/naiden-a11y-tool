import { hasBrokenSamePageLinks } from "./broken-same-page-links/broken-same-page-links.js";
import { hasBrokenSkipLinks } from "./broken-skip-links/broken-skip-links.js";
import { hasEmptyButtons } from "./empty-buttons/empty-buttons.js";
import { hasEmptyLinks } from "./empty-links/empty-links.js";
import { hasInteractiveControlsWithInteractiveControlsAsChildren } from "./interactive-controls-w-interactive-children/interactive-controls-w-interactive-children.js";

export async function linksAndButtonsAudit(auditResults) {
    await hasEmptyLinks(auditResults);
    await hasEmptyButtons(auditResults);
    await hasBrokenSkipLinks(auditResults);
    await hasInteractiveControlsWithInteractiveControlsAsChildren(auditResults);
    await hasBrokenSamePageLinks(auditResults);
}