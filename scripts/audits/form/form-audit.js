import { hasEmptyLabelsEval } from "./has-empty-labels/has-empty-labels.js";
import { hasEmptySubmitButonOrResetInputValuesEval } from "./has-empty-submit-button-reset-values/has-empty-submit-button-reset-values.js";
import { hasFieldsetsMissingLegendEval } from "./has-fieldsets-missing-legend/has-fieldsets-missing-legend.js";
import { hasFormControlLabelsEval } from "./has-form-control-labels/has-form-control-labels.js";
import { hasVisibleFormControlLabelsEval } from "./has-form-control-visible-labels/has-form-control-visible-labels.js";
import { hasAutocompleteValidValuesEval } from "./has-autocomplete-valid-values/has-autocomplete-valid-values.js";
import { hasImageInputsEval } from "./has-image-inputs/has-image-inputs.js";
import { hasRelatedFormControlsMissingFieldsetEval } from "./has-related-form-controls-without-fieldset/has-related-form-controls-without-fieldset.js.js";

export async function formAudit(auditResults) {
  await hasFormControlLabelsEval(auditResults);
  await hasEmptyLabelsEval(auditResults);
  await hasVisibleFormControlLabelsEval(auditResults);
  await hasRelatedFormControlsMissingFieldsetEval(auditResults);
  await hasFieldsetsMissingLegendEval(auditResults);
  await hasEmptySubmitButonOrResetInputValuesEval(auditResults);
  await hasImageInputsEval(auditResults);
  await hasAutocompleteValidValuesEval(auditResults);
}
