import { formElementsErrors } from "../../../errors/forms.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasAutocompleteValidValues(auditResults) {
    const validAutocompleteValues = [
        "name", "honorific-prefix", "given-name", "additional-name", "family-name", "honorific-suffix",
        "nickname", "email", "username", "new-password", "current-password", "organization-title",
        "organization", "street-address", "address-line1", "address-line2", "address-line3", "address-level4",
        "address-level3", "address-level2", "address-level1", "country", "country-name", "postal-code",
        "cc-name", "cc-given-name", "cc-additional-name", "cc-family-name", "cc-number", "cc-exp",
        "cc-exp-month", "cc-exp-year", "cc-csc", "cc-type", "transaction-currency", "transaction-amount",
        "language", "bday", "bday-day", "bday-month", "bday-year", "sex", "tel", "tel-country-code",
        "tel-national", "tel-area-code", "tel-local", "tel-local-prefix", "tel-local-suffix",
        "tel-extension", "impp", "url", "photo"
    ];

    const hasAutocompleteValidValues = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
        return inputs.map(input => ({
            outerHTML: input.outerHTML,
            selector: getUniqueSelector(input),
            autocomplete: input.getAttribute('autocomplete'),
            type: input.getAttribute('type'),
            name: input.getAttribute('name'),
        }));
    `);

    hasAutocompleteValidValues.forEach(input => {
        const { autocomplete, outerHTML, selector } = input;
        
        const isPersonalDataField = validAutocompleteValues.some(value => 
            (autocomplete || "").startsWith(value)
        );

        if (!autocomplete || !isPersonalDataField) {
            auditResults.push({
                ...formElementsErrors[8],
                element: outerHTML,
                selector,
                issues: {
                    missingAutocomplete: !autocomplete,
                    invalidAutocomplete: autocomplete && !validAutocompleteValues.includes(autocomplete),
                },
            });
        }
    });
}