import { hasEmptyLabels } from "./empty-labels/empty-labels.js";
import { hasEmptySubmitButonOrResetInputValues } from "./empty-submit-button-reset-values/empty-submit-button-reset-values.js";
import { hasFieldsetsMissingLegend } from "./fieldsets-missing-legend/fieldsets-missing-legend.js";
import { hasFormControlLabels } from "./form-control-labels/form-control-labels.js";
import { hasVisibleFormControlLabels } from "./form-control-visible-labels/form-control-visible-labels.js";
import { hasAutocompleteValidValues } from "./has-autocomplete-valid-values/has-autocomplete-valid-values.js";
import { hasImageInputs } from "./image-inputs/image-inputs.js";
import { relatedFormControlsMissingFieldset } from "./radios-checkboxes-without-fieldset/radios-checkboxes-without-fieldset.js";

export async function formAudit(auditResults) {
    await hasEmptyLabels(auditResults);
    await hasFormControlLabels(auditResults);
    await hasFieldsetsMissingLegend(auditResults);
    await relatedFormControlsMissingFieldset(auditResults);
    await hasEmptySubmitButonOrResetInputValues(auditResults);    
    await hasImageInputs(auditResults);
    await hasVisibleFormControlLabels(auditResults);
    await hasAutocompleteValidValues(auditResults);
}