import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaRoleSupportedAriaAttributes(auditResults) {
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
}