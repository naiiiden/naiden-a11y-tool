import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaValidAttributeValues(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr-value
    const ariaAttributesValidValues = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            [aria-atomic]:not([aria-atomic=''], [aria-atomic='true'], [aria-atomic='false']), 
            [aria-busy]:not([aria-busy=''], [aria-busy='true'], [aria-busy='false']), 
            [aria-current]:not([aria-current=''], [aria-current='page'], [aria-current='step'], [aria-current='location'], [aria-current='date'], [aria-current='time']), 
            [aria-disabled]:not([aria-disabled=''], [aria-disabled='true'], [aria-disabled='false']), 
            [aria-dropeffect]:not([aria-dropeffect=''], [aria-dropeffect='copy'], [aria-dropeffect='execute'], [aria-dropeffect='link'], [aria-dropeffect='move'], [aria-dropeffect='none'], [aria-dropeffect='popup']), 
            [aria-grabbed]:not([aria-grabbed=''], [aria-grabbed='true'], [aria-grabbed='false'], [aria-grabbed='undefined']), 
            [aria-haspopup]:not([aria-haspopup=''], [aria-haspopup='true'], [aria-haspopup='false'], [aria-haspopup='menu'], [aria-haspopup='listbox'], [aria-haspopup='tree'], [aria-haspopup='grid'], [aria-haspopup='dialog']), 
            [aria-hidden]:not([aria-hidden=''], [aria-hidden='true'], [aria-hidden='false'], [aria-hidden='undefined']), 
            [aria-invalid]:not([aria-invalid=''], [aria-invalid='true'], [aria-invalid='false'], [aria-invalid='grammar'], [aria-invalid='spelling']), 
            [aria-live]:not([aria-live=''], [aria-live='off'], [aria-live='assertive'], [aria-live='polite']), 
            [aria-relevant]:not([aria-relevant=''], [aria-relevant='additions'], [aria-relevant='additions text'], [aria-relevant='all'], [aria-relevant='removals'], [aria-relevant='text']), 
            [aria-autocomplete]:not([aria-autocomplete=''], [aria-autocomplete='inline'], [aria-autocomplete='list'], [aria-autocomplete='both'], [aria-autocomplete='none']), 
            [aria-checked]:not([aria-checked=''], [aria-checked='true'], [aria-checked='false'], [aria-checked='mixed'], [aria-checked='undefined']), 
            [aria-disabled]:not([aria-disabled=''], [aria-disabled='true'], [aria-disabled='false']), 
            [aria-expanded]:not([aria-expanded=''], [aria-expanded='true'], [aria-expanded='false'], [aria-expanded='undefined']), 
            [aria-modal]:not([aria-modal=''], [aria-modal='true'], [aria-modal='false']), 
            [aria-multiline]:not([aria-multiline=''], [aria-multiline='true'], [aria-multiline='false']), 
            [aria-multiselectable]:not([aria-multiselectable=''], [aria-multiselectable='true'], [aria-multiselectable='false']), 
            [aria-orientation]:not([aria-orientation=''], [aria-orientation='horizontal'], [aria-orientation='vertical'], [aria-orientation='undefined']), 
            [aria-pressed]:not([aria-pressed=''], [aria-pressed='true'], [aria-pressed='false'], [aria-pressed='mixed'], [aria-pressed='undefined']), 
            [aria-readonly]:not([aria-readonly=''], [aria-readonly='true'], [aria-readonly='false']), 
            [aria-required]:not([aria-required=''], [aria-required='true'], [aria-required='false']), 
            [aria-selected]:not([aria-selected=''], [aria-selected='true'], [aria-selected='false'], [aria-selected='undefined']), 
            [aria-sort]:not([aria-sort=''], [aria-sort='ascending'], [aria-sort='descending'], [aria-sort='none'], [aria-sort='other'])
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element),
            }));
    `)

    ariaAttributesValidValues.forEach(element => {
        auditResults.push({ ...ariaErrors[14], element: element.outerHTML, selector: element.selector });
    });
}