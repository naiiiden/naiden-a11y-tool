import { hasAriaAllowedRoleEval } from "./aria-allowed-role/aria-allowed-role.js";
import { hasAriaValidAttributeValuesEval } from "./aria-valid-attribute-values/aria-valid-attribute-values.js";
import { hasAriaCommandsNamesEval } from "./aria-command-names/aria-command-names.js";
import { hasAriaConditionalAttributesEval } from "./aria-conditional-attributes/aria-conditional-attributes.js";
import { hasAriaDialogAndAlertDialogNamesEval } from "./aria-dialog-and-alertdialog-names/aria-dialog-and-alertdialog-names.js";
import { hasAriaHiddenFocusableOrWithFocusableChildrenEval } from "./aria-hidden-focusable-or-with-focusable-children/aria-hidden-focusable-or-with-focusable-children.js";
import { hasAriaInputFieldNamesEval } from "./aria-input-field-names/aria-input-field-names.js";
import { hasAriaMeterNamesEval } from "./aria-meter-names/aria-meter-names.js";
import { hasAriaProgressbarNamesEval } from "./aria-progressbar-names/aria-progressbar-names.js";
import { hasAriaRoleProhibitedAttributesEval } from "./aria-role-prohibited-attributes/aria-role-prohibited-attributes.js";
import { hasAriaRoleRequiredAriaAttributesEval } from "./aria-role-required-aria-attributes/aria-role-required-aria-attributes.js";
import { hasAriaRoleRequiredChildrenEval } from "./aria-role-required-children/aria-role-required-children.js";
import { hasAriaRoleRequiredParentEval } from "./aria-role-required-parent/aria-role-required-parent.js";
import { hasAriaRoleAllowedAriaAttributesEval } from "./aria-role-allowed-aria-attributes/aria-role-allowed-aria-attributes.js";
import { hasAriaRoleValidValuesEval } from "./aria-roles-valid-values/aria-roles-valid-values.js";
import { hasAriaTextNoFocusableChildrenEval } from "./aria-text-no-focusable-children/aria-text-no-focusable-children.js";
import { hasAriaToggleFieldNamesEval } from "./aria-toggle-field-names/aria-toggle-field-names.js";
import { hasAriaTooltipNamesEval } from "./aria-tooltip-names/aria-tooltip-names.js";
import { hasAriaTreeitemNamesEval } from "./aria-treeitem-names/aria-treeitem-names.js";
import { hasAriaValidAttributesEval } from "./aria-valid-attributes/aria-valid-attributes.js";
import { hasAriaDeprecatedRolesEval } from "./has-aria-deprecated-roles/has-aria-deprecated-roles.js";
import { hasAriaHiddenBodyEval } from "./has-aria-hidden-body/has-aria-hidden-body.js";
import { hasRolePresentationOrNoneConflictEval } from "./has-role-presentation-or-none-conflict/has-role-presentation-or-none-conflict.js";
import { hasAriaLabelContentNameMismatchEval } from "./aria-label-content-name-mismatch/aria-label-content-name-mismatch.js";

export async function ariaAudit(auditResults) {
  await hasAriaHiddenBodyEval(auditResults);
  
  await hasAriaHiddenFocusableOrWithFocusableChildrenEval(auditResults);
  await hasAriaTextNoFocusableChildrenEval(auditResults);
  await hasAriaLabelContentNameMismatchEval(auditResults);
  
  await hasAriaAllowedRoleEval(auditResults);
  await hasAriaRoleRequiredAriaAttributesEval(auditResults);
  await hasAriaRoleRequiredChildrenEval(auditResults);
  await hasAriaRoleRequiredParentEval(auditResults);
  await hasAriaRoleValidValuesEval(auditResults);
  await hasAriaRoleAllowedAriaAttributesEval(auditResults);
  await hasRolePresentationOrNoneConflictEval(auditResults);
  await hasAriaDeprecatedRolesEval(auditResults);
  
  await hasAriaCommandsNamesEval(auditResults);
  await hasAriaToggleFieldNamesEval(auditResults);
  await hasAriaInputFieldNamesEval(auditResults);
  await hasAriaDialogAndAlertDialogNamesEval(auditResults);
  await hasAriaTooltipNamesEval(auditResults);
  await hasAriaProgressbarNamesEval(auditResults);
  await hasAriaTreeitemNamesEval(auditResults);
  await hasAriaMeterNamesEval(auditResults);
  
  await hasAriaValidAttributesEval(auditResults);
  await hasAriaValidAttributeValuesEval(auditResults);
  await hasAriaRoleProhibitedAttributesEval(auditResults);
  await hasAriaConditionalAttributesEval(auditResults);
}
