import { ariaErrors } from "../../errors/aria.js";
import { getUniqueSelector } from "../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../utils/inspected-window-eval.js";
import { ariaAppropriateRole } from "./aria-appropriate-role/aria-appropriate-role.js";
import { ariaAttributesValidValues } from "./aria-attributes-valid-values/aria-attributes-valid-values.js";
import { ariaCommandsNames } from "./aria-command-names/aria-command-names.js";
import { ariaDialogAndAlertDialogNames } from "./aria-dialog-and-alertdialog-names/aria-dialog-and-alertdialog-names.js";
import { ariaHiddenFocusableOrWithFocusableChildren } from "./aria-hidden-focusable-or-with-focusable-children/aria-hidden-focusable-or-with-focusable-children.js";
import { ariaInputFieldNames } from "./aria-input-field-names/aria-input-field-names.js";
import { ariaMeterNames } from "./aria-meter-names/aria-meter-names.js";
import { ariaProgressbarNames } from "./aria-progressbar-names/aria-progressbar-names.js";
import { ariaRoleValidValues } from "./aria-roles-valid-values/aria-roles-valid-values.js";
import { ariaTextNoFocusableChildren } from "./aria-text-no-focusable-children/aria-text-no-focusable-children.js";
import { ariaToggleFieldNames } from "./aria-toggle-field-names/aria-toggle-field-names.js";
import { ariaTooltipNames } from "./aria-tooltip-names/aria-tooltip-names.js";
import { ariaTreeitemNames } from "./aria-treeitem-names/aria-treeitem-names.js";
import { hasAriaDeprecatedRoles } from "./has-aria-deprecated-roles/has-aria-deprecated-roles.js";
import { hasAriaHiddenBody } from "./has-aria-hidden-body/has-aria-hidden-body.js";

export async function ariaAudit(auditResults) {
    await hasAriaHiddenBody(auditResults);
    await ariaCommandsNames(auditResults);
    await ariaMeterNames(auditResults);
    await ariaProgressbarNames(auditResults);
    await ariaTooltipNames(auditResults);
    await hasAriaDeprecatedRoles(auditResults);
    await ariaInputFieldNames(auditResults);
    await ariaToggleFieldNames(auditResults);
    await ariaHiddenFocusableOrWithFocusableChildren(auditResults);
    await ariaRoleValidValues(auditResults);
    await ariaDialogAndAlertDialogNames(auditResults);
    await ariaTextNoFocusableChildren(auditResults);
    await ariaAppropriateRole(auditResults);
    await ariaTreeitemNames(auditResults);
    await ariaAttributesValidValues(auditResults);

    const ariaValidAttributesArray = [
        'aria-activedescendant', 'aria-atomic', 'aria-autocomplete', 'aria-busy', 'aria-checked', 'aria-colcount',
        'aria-colindex', 'aria-colspan', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
        'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-expanded', 'aria-flowto', 'aria-grabbed', 
        'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 
        'aria-level', 'aria-live', 'aria-modal', 'aria-multiline', 'aria-multiselectable', 'aria-orientation', 
        'aria-owns', 'aria-placeholder', 'aria-posinset', 'aria-pressed', 'aria-readonly', 'aria-relevant', 
        'aria-required', 'aria-roledescription', 'aria-rowcount', 'aria-rowindex', 'aria-rowspan', 'aria-selected', 
        'aria-setsize', 'aria-sort', 'aria-valuemax', 'aria-valuemin', 'aria-valuenow', 'aria-valuetext'
    ];

    // https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr
    const ariaValidAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('*'))
            .flatMap(element => 
                Array.from(element.attributes)
                    .filter(attr => attr.name.startsWith('aria') && !${JSON.stringify(ariaValidAttributesArray)}.includes(attr.name))
                    .map(attr => ({
                        outerHTML: element.outerHTML,
                        selector: getUniqueSelector(element)
                    }))
        );
    `);

    ariaValidAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[15], element: element.outerHTML, selector: element.selector });
    });

    const ariaRoleSupportedAriaAttributesList = {
        alert: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hddien', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 
            'aria-relevant', 'aria-roledescription'
        ], 
        alertdialog: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-modal', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ], 
        application: [
            'aria-activedescendant', 'aria-disabled', 'aria-errormessage', 'aria-expanded', 'aria-haspopup', 'aria-invalid', 
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-hidden', 'aria-keyshortcuts', 'aria-label', 
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ], 
        article: [
            'aria-posinset', 'aria-setsize', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 
            'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        banner: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        blockquote: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        button: [
            'aria-disabled', 'aria-haspopup', 'aria-expanded', 'aria-pressed', 'aria-atomic', 'aria-busy',
            'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-dropeffect', 'aria-errormessage',
            'aria-flowto', 'aria-grabbed', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        caption: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 
            'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        cell: [
            'aria-colindex', 'aria-colspan', 'aria-rowindex', 'aria-rowspan', 'aria-atomic', 'aria-busy',
            'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect',
            'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant',
            'aria-roledescription'
        ],
        checkbox: [
            'aria-checked', 'aria-errormessage', 'aria-expanded', 'aria-invalid', 'aria-readonly', 'aria-required',
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant',
            'aria-roledescription'
        ],
        code: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        columnheader: [
            'aria-sort', 'aria-atomic', 'aria-busy', 'aria-colindex', 'aria-colspan', 'aria-controls',
            'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage',
            'aria-expanded', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-readonly', 
            'aria-relevant', 'aria-required', 'aria-roledescription', 'aria-rowindex', 'aria-rowspan', 'aria-selected'
        ],
        combobox: [
            'aria-controls', 'aria-expanded', 'aria-activedescendant', 'aria-autocomplete', 'aria-errormessage', 'aria-haspopup',
            'aria-invalid', 'aria-readonly', 'aria-required', 'aria-atomic', 'aria-busy', 'aria-current',
            'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 
            'aria-hidden', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 
            'aria-relevant', 'aria-roledescription'
        ],
        complementary: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        contentinfo: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],  
        definition: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        dialog: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-modal', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        directory: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        document: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        emphasis: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        feed: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        figure: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        form: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        generic: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant'
        ],
        gridcell: [
            'aria-disabled', 'aria-errormessage', 'aria-expanded', 'aria-haspopup', 'aria-invalid', 'aria-readonly',
            'aria-required', 'aria-selected', 'aria-atomic', 'aria-busy', 'aria-colindex', 'aria-colspan',
            'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-dropeffect', 'aria-flowto', 
            'aria-grabbed', 'aria-hidden', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-rowindex', 'aria-rowspan'
        ],
        group: [
            'aria-activedescendant', 'aria-disabled', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current',
            'aria-describedby', 'aria-details', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed',
            'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby',
            'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        heading: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-level'
        ],
        img: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        insertion: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        link: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-expanded'
        ],
        list: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        listbox: [
            'aria-errormessage', 'aria-expanded', 'aria-invalid', 'aria-multiselectable', 'aria-readonly', 'aria-required',
            'aria-activedescendant', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby',
            'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-orientation',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        listitem: [
            'aria-level', 'aria-posinset', 'aria-setsize', 'aria-atomic', 'aria-busy', 'aria-controls',
            'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage',
            'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts',
            'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        log: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        main: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        marquee: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        math: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        menu: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-activedescendant', 'aria-orientation'
        ],
        menubar: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-activedescendant', 'aria-orientation'
        ],
        menuitem: [
            'aria-disabled', 'aria-expanded', 'aria-haspopup', 'aria-posinset', 'aria-setsize', 'aria-atomic',
            'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-dropeffect',
            'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts',
            'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        menuitemcheckbox: [
            'aria-checked', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby',
            'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-expanded', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-posinset', 'aria-relevant', 'aria-roledescription',
            'aria-setsize'
        ],
        menuitemradio: [
            'aria-checked', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby',
            'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-expanded', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-posinset', 'aria-relevant', 'aria-roledescription',
            'aria-setsize'
        ],
        meter: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-valuemax', 'aria-valuemin', 'aria-valuetext'
        ],
        navigation: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        none: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        note: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        option: [
            'aria-selected', 'aria-checked', 'aria-posinset', 'aria-setsize', 'aria-atomic', 'aria-busy',
            'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect',
            'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant',
            'aria-roledescription'
        ],
        paragraph: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ], 
        presentation: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        progressbar: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-valuemax', 'aria-valuemin', 'aria-valuetext',
            'aria-valuenow'
        ],
        radio: [
            'aria-posinset', 'aria-setsize', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current',
            'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        radiogroup: [
            'aria-errormessage', 'aria-invalid', 'aria-readonly', 'aria-required', 'aria-activedescendant', 'aria-atomic',
            'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled',
            'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-keyshortcuts',
            'aria-label', 'aria-labelledby', 'aria-live', 'aria-orientation', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        region: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'ari-alabel', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        row: [
            'aria-colindex', 'aria-expanded', 'aria-level', 'aria-posinset', 'aria-rowindex', 'aria-setsize',
            'aria-selected', 'aria-activedescendant', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current',
            'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        rowgroup: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'ari-alabel', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        rowheader: [
            'aria-expanded', 'aria-sort', 'aria-atomic', 'aria-busy', 'aria-colindex', 'aria-colspan',
            'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect',
            'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-readonly',
            'aria-relevant', 'aria-required', 'aria-roledescription', 'aria-rowindex', 'aria-rowspan', 'aria-selected'
        ],
        scrollbar: [
            'aria-controls', 'aria-valuenow', 'aria-disabled', 'aria-orientation', 'aria-valuemax', 'aria-valuemin',
            'aria-atomic', 'aria-busy', 'aria-current', 'aria-describedby', 'aria-details', 'aria-dropeffect',
            'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant',
            'aria-roledescription', 'aria-valuetext'
        ],
        search: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'ari-alabel', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        searchbox: [
            'aria-activedescendant', 'aria-atomic', 'aria-autocomplete', 'aria-busy', 'aria-controls', 'aria-current',
            'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
            'aria-labelledby', 'aria-live', 'aria-multiline', 'aria-owns', 'aria-placeholder', 'aria-readonly',
            'aria-relevant', 'aria-required', 'aria-roledescription'
        ],
        separator: [
            'aria-disabled', 'aria-orientation', 'aria-valuemax', 'aria-valuemin', 'aria-valuetext', 'aria-atomic',
            'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-dropeffect',
            'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant',
            'aria-roledescription', 'aria-valuenow'
        ],
        slider: [
            'aria-errormessage', 'aria-haspopup', 'aria-invalid', 'aria-orientation', 'aria-readonly', 'aria-valuemax',
            'aria-valuemin', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby',
            'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-hidden',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant',
            'aria-roledescription', 'aria-valuetext'
        ], 
        spinbutton: [
            'aria-errormessage', 'aria-invalid', 'aria-readonly', 'aria-required', 'aria-valuemax', 'aria-valuemin',
            'aria-valuenow', 'aria-valuetext', 'aria-activedescendant', 'aria-atomic', 'aria-busy', 'aria-controls',
            'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby',
            'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        status: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ], 
        strong: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        subscript: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        superscript: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        switch: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-required', 'aria-label', 'aria-labelledby', 'aria-roledescription', 'aria-checked', 'aria-expanded',
            'aria-readonly'
        ],
        tab: [
            'aria-disabled', 'aria-expanded', 'aria-haspopup', 'aria-posinset', 'aria-selected', 'aria-setsize',
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-hidden', 'aria-invalid',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant',
            'aria-roledescription'
        ],
        table: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-colcount', 'aria-rowcount'
        ],
        tablist: [
            'aria-multiselectable', 'aria-orientation', 'aria-activedescendant', 'aria-atomic', 'aria-busy', 'aria-controls',
            'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage',
            'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts',
            'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        tabpanel: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        term: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        textbox: [
            'aria-activedescendant', 'aria-autocomplete', 'aria-errormessage', 'aria-haspopup', 'aria-invalid', 'aria-multiline',
            'aria-placeholder', 'aria-readonly', 'aria-required', 'aria-atomic', 'aria-busy', 'aria-controls',
            'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-flowto',
            'aria-grabbed', 'aria-hidden', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        time: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        timer: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        toolbar: [
            'aria-orientation', 'aria-activedescendant', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current',
            'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        tooltip: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        tree: [
            'aria-errormessage', 'aria-invalid', 'aria-multiselectable', 'aria-required', 'aria-activedescendant', 'aria-atomic',
            'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled',
            'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-keyshortcuts',
            'aria-label', 'aria-labelledby', 'aria-live', 'aria-orientation', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        treegrid: [
            'aria-activedescendant', 'aria-atomic', 'aria-busy', 'aria-colcount', 'aria-controls', 'aria-current',
            'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 
            'aria-labelledby', 'aria-live', 'aria-multiselectable', 'aria-orientation', 'aria-owns', 'aria-readonly', 
            'aria-relevant', 'aria-required', 'aria-roledescription', 'aria-rowcount'
        ],
        treeitem: [
            'aria-expanded', 'aria-haspopup', 'aria-atomic', 'aria-busy', 'aria-checked', 'aria-controls',
            'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage',
            'aria-flowto', 'aria-grabbed', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 
            'aria-labelledby', 'aria-level', 'aria-live', 'aria-owns', 'aria-posinset', 'aria-relevant', 
            'aria-roledescription', 'aria-selected', 'aria-setsize'
        ],
        widget: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        window: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-modal'
        ]
    }

    // https://dequeuniversity.com/rules/axe/4.10/aria-allowed-attr
    const ariaRoleSupportedAriaAttributes = await inspectedWindowEval(`
        const ariaRoleSupportedAriaAttributesList = ${JSON.stringify(ariaRoleSupportedAriaAttributesList)};
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('[role]'))
            .flatMap(element => {
                const validAttributes = ariaRoleSupportedAriaAttributesList[element.getAttribute('role')] || [];
                return Array.from(element.attributes)
                    .filter(attr => attr.name.startsWith('aria') && !validAttributes.includes(attr.name))
                    .map(attr => ({
                        outerHTML: element.outerHTML,
                        selector: getUniqueSelector(element)
                    }))
        });
    `);

    ariaRoleSupportedAriaAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[16], element: element.outerHTML, selector: element.selector });
    });

    // https://dequeuniversity.com/rules/axe/4.10/aria-required-attr
    const ariaRoleRequiredAriaAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            [role='checkbox']:not([aria-checked]), 
            [role='combobox']:not([aria-controls], [aria-expanded]), 
            [role='heading']:not([aria-level]), 
            [role='meter']:not([aria-valuenow]), 
            [role='menuitemcheckbox']:not([aria-checked]), 
            [role='option']:not([aria-selected]), 
            [role='radio']:not([aria-checked]), 
            [role='scrollbar']:not([aria-controls], [aria-valuenow]), 
            [role='separator']:not([aria-valuenow]), 
            [role='slider']:not([aria-valuenow]), 
            [role='switch']:not([aria-checked])
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }))
    `)

    ariaRoleRequiredAriaAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[17], element: element.outerHTML, selector: element.selector });
    });

    // https://dequeuniversity.com/rules/axe/4.10/aria-required-children
    const ariaRoleRequiredChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            [role='feed']:not(:has([role='article'])), 
            [role='grid']:not(:has([role='row'], [role='rowgroup'])), 
            [role='list']:not(:has([role='listitem'])), 
            [role='listbox']:not(:has([role='group'], [role='option'])), 
            [role='menu']:not(:has([role='group'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'])), 
            [role='menubar']:not(:has([role='group'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'])), 
            [role='radiogroup']:not(:has([role='radio'])), 
            [role='row']:not(:has([role='cell'], [role='columnheader'], [role='gridcell'], [role='rowheader'])), 
            [role='rowgroup']:not(:has([role='row'])), 
            [role='table']:not(:has([role='row'], [role='rowgroup'])), 
            [role='tablist']:not(:has([role='tab'])), 
            [role='tree']:not(:has([role='group'], [role='treeitem'])), 
            [role='treegrid']:not(:has([role='row'], [role='rowgroup']))
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }))
    `)

    ariaRoleRequiredChildren.forEach(element => {
        auditResults.push({ ...ariaErrors[18], element: element.outerHTML, selector: element.selector });
    });

    // https://dequeuniversity.com/rules/axe/4.10/aria-required-parent
    const ariaRoleRequiredParent = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            [role='caption']:is(:not([role='figure'] [role='caption'], [role='grid'] [role='caption'], [role='table'] [role='caption'], [role='treegrid'] [role='caption'])), 
            [role='cell']:is(:not([role='row'] [role='cell'])), 
            [role='columnheader']:is(:not([role='row'] [role='columnheader'])), 
            [role='gridcell']:is(:not([role='row'] [role='gridcell'])), 
            [role='listitem']:is(:not([role='list'] [role='listitem'], [role='directory'] [role='listitem'])), 
            [role='menuitem']:is(:not([role='group'] [role='menuitem'], [role='menu'] [role='menuitem'], [role='menubar'] [role='menuitem'])),
            [role='menuitemcheckbox']:is(:not([role='group'] [role='menuitemcheckbox'], [role='menu'] [role='menuitemcheckbox'], [role='menubar'] [role='menuitemcheckbox'])),
            [role='menuitemradio']:is(:not([role='group'] [role='menuitemradio'], [role='menu'] [role='menuitemradio'], [role='menubar'] [role='menuitemradio'])),
            [role='option']:is(:not([role='group'] [role='option'], [role='listbox'] [role='option'])), 
            [role='row']:is(:not([role='grid'] [role='row'], [role='rowgroup'] [role='row'], [role='table'] [role='row'], [role='treegrid'] [role='row'])),
            [role='rowgroup']:is(:not([role='grid'] [role='rowgroup'], [role='table'] [role='rowgroup'], [role='treegrid'] [role='rowgroup'])),
            [role='rowheader']:is(:not([role='row'] [role='rowheader'])), 
            [role='tab']:is(:not([role='tablist'] [role='tab'])),
            [role='treeitem']:is(:not([role='group'] [role='treeitem'], [role='tree'] [role='treeitem']))
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }))
    `)

    ariaRoleRequiredParent.forEach(element => {
        auditResults.push({ ...ariaErrors[19], element: element.outerHTML, selector: element.selector });
    });

    // https://dequeuniversity.com/rules/axe/4.10/aria-prohibited-attr
    const ariaRolePermittedAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            [role='caption']:has([aria-label], [aria-labelledby]), 
            [role='code']:has([aria-label], [aria-labelledby]), 
            [role='deletion']:has([aria-label], [aria-labelledby]), 
            [role='emphasis']:has([aria-label], [aria-labelledby]), 
            [role='generic']:has([aria-label], [aria-labelledby], [aria-roledescription]), 
            [role='insertion']:has([aria-label], [aria-labelledby]), 
            [role='paragraph']:has([aria-label], [aria-labelledby]), 
            [role='presentation']:has([aria-label], [aria-labelledby]), 
            [role='strong']:has([aria-label], [aria-labelledby]), 
            [role='subscript']:has([aria-label], [aria-labelledby]), 
            [role='superscript']:has([aria-label], [aria-labelledby])
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }))
    `)

    ariaRolePermittedAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[20], element: element.outerHTML, selector: element.selector });
    });

    // https://dequeuniversity.com/rules/axe/4.10/aria-conditional-attr
    const ariaConditionalAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            input[type='checkbox'][aria-checked]:not([aria-checked=''])
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }))
    `)

    ariaConditionalAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[22], element: element.outerHTML, selector: element.selector });
    });
}