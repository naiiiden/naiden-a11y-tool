import { hasEmptyLabelsEval } from "./empty-labels/empty-labels.js";
import { hasEmptySubmitButonOrResetInputValuesEval } from "./empty-submit-button-reset-values/empty-submit-button-reset-values.js";
import { hasFieldsetsMissingLegendEval } from "./fieldsets-missing-legend/fieldsets-missing-legend.js";
import { hasFormControlLabelsEval } from "./form-control-labels/form-control-labels.js";
import { hasVisibleFormControlLabelsEval } from "./form-control-visible-labels/form-control-visible-labels.js";
import { hasAutocompleteValidValuesEval } from "./has-autocomplete-valid-values/has-autocomplete-valid-values.js";
import { hasImageInputsEval } from "./image-inputs/image-inputs.js";
import { hasRelatedFormControlsMissingFieldsetEval } from "./related-form-controls-without-fieldset/related-form-controls-without-fieldset.js.js";

export async function formAudit(auditResults) {
  await hasEmptyLabelsEval(auditResults);
  await hasFormControlLabelsEval(auditResults);
  await hasFieldsetsMissingLegendEval(auditResults);
  await hasRelatedFormControlsMissingFieldsetEval(auditResults);
  await hasEmptySubmitButonOrResetInputValuesEval(auditResults);
  await hasImageInputsEval(auditResults);
  await hasVisibleFormControlLabelsEval(auditResults);
  await hasAutocompleteValidValuesEval(auditResults);
}
