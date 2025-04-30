import { formErrors } from "../../../errors/forms.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

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
        "tel-extension", "impp", "url", "photo", "billing", "fax", "home", "mobile", "off", "on", "pager",
        "shipping", "work"
    ];

    const hasAutocompleteValidValues = await inspectedWindowEval(`
        const validAutocompleteValues = new Set(${JSON.stringify(validAutocompleteValues)});
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};

        return Array.from(document.querySelectorAll("[autocomplete]"))
            .filter(element => isElementVisible(element))
            .filter(element => !validAutocompleteValues.has(element.getAttribute("autocomplete").trim()))
            .map(element => ({
                outerHTML: element.cloneNode().outerHTML,
                selector: getUniqueSelector(element),
            }));
    `);

    hasAutocompleteValidValues.forEach(element => {
        auditResults.push({ ...formErrors[8], element: element.outerHTML, selector: element.selector });
    });
}