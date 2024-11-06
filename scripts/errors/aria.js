export const ariaErrors = [
    {
        id: 0,
        name: "aria-hidden='true' must not be present on document body",
        description: "aria-hidden='true' must not be present on document body",
        wcagLink: "",
        fix: "remove aria-hidden='true' from document body",
    },
    {
        id: 1,
        name: "aria commands must have an accessible name",
        description: "aria commands must have an accessible name",
        wcagLink: "",
        fix: "ensure elements with role (link, button, menuitem) have accessible names"
    },
    {
        id: 2,
        name: "aria meter elements must have an accessible name",
        description: "aria meter elements must have an accessible name",
        wcagLink: "",
        fix: "ensure elements with role meter have accessible names"
    },
    {
        id: 3,
        name: "aria progressbar elements must have an accessible name",
        description: "aria progressbar elements must have an accessible name",
        wcagLink: "",
        fix: "ensure elements with role progressbar have accessible names"
    },
    {
        id: 4,
        name: "aria tooltip elements must have an accessible name",
        description: "aria tooltip elements must have an accessible name",
        wcagLink: "",
        fix: "ensure elements with role tooltip have accessible names"
    },
    {
        id: 5,
        name: "deprecated aria roles must not be used",
        description: "deprecated aria roles must not be used",
        wcagLink: "",
        fix: "make sure all that all role attributes are not using deprecated values"
    },
    {
        id: 6,
        name: "aria input fields must have an accessible names",
        description: "aria input fields must have an accessible names",
        wcagLink: "",
        fix: "ensure elements with role (combobox, listbox, searchbox, slider, spinbutton, textbox) have accessible names"
    },
    {
        id: 7,
        name: "aria toggle field elements must have an accessible name",
        description: "aria toggle field elements must have an accessible name",
        wcagLink: "",
        fix: "ensure elements with role (checkbox, menu, menuitemcheckbox, menuitemradio, radio, radiogroup, switch) have accessible names"
    },
    {
        id: 8,
        name: "aria hidden elements must not be focusable or contain focusable children",
        description: "aria hidden elements must not be focusable or contain focusable children",
        wcagLink: "",
        fix: "ensure aria hidden elements are not focusable and don't contain focusable children"
    },
    {
        id: 9,
        name: "aria roles must conform to valid values",
        description: "aria roles must conform to valid values",
        wcagLink: "",
        fix: "ensure all aria role elements have a valid value"
    },
    {
        id: 10,
        name: "aria dialog and alertdialog elements must have an accessible name",
        description: "aria dialog and alertdialog elements must have an accessible name",
        wcagLink: "",
        fix: "ensure elements with role dialog and alertdialog have accessible names"
    },
    {
        id: 11,
        name: "aria role text elements should not have focusable descendants",
        description: "aria role text elements should not have focusable descendants",
        wcagLink: "",
        fix: "ensure elements with role text don't have focusable descendants"
    },
    {
        id: 12,
        name: "aria role should be appropriate for the element",
        description: "aria role should be appropriate for the element",
        wcagLink: "",
        fix: "ensure elements with role attribute have appropriate value for the element"
    },
    {
        id: 13,
        name: "aria treeitem elements must have an accessible name",
        description: "aria treeitem elements must have an accessible name",
        wcagLink: "",
        fix: "ensure aria treeitem elements have accessible names"
    },
    {
        id: 14,
        name: "aria attributes must conform to valid values",
        description: "aria attributes must conform to valid values",
        wcagLink: "",
        fix: "ensure all aria attributes have valid values"
    },
    {
        id: 15,
        name: "aria attributes must conform to valid names",
        description: "aria attributes must conform to valid names",
        wcagLink: "",
        fix: "ensure all aria attributes have valid names"
    },
    {
        id: 16,
        name: "elements with aria roles must only use supported aria attributes",
        description: "elements with aria roles must only use supported aria attributes",
        wcagLink: "",
        fix: "ensure element with aria roles use aria attributes allowed for their role"
    },
    {
        id: 17,
        name: "required aria attributes must be provided for elements with aria role",
        description: "required aria attributes must be provided for elements with aria role",
        wcagLink: "",
        fix: "ensure all elements with aria role have required attributes defined"
    },
    {
        id: 18,
        name: "certain aria roles must contain particular children",
        description: "certain aria roles must contain particular children",
        wcagLink: "",
        fix: "ensure aria role elements have required children role"
    },
    {
        id: 19,
        name: "certain aria roles must be contained by particular parents",
        description: "certain aria roles must be contained by particular parents",
        wcagLink: "",
        fix: "ensure aria role elements are contained by parent role"
    },
    {
        id: 20,
        name: "aria role elements must use permitted aria attributes",
        description: "aria role elements must use permitted aria attributes",
        wcagLink: "",
        fix: "ensure aria attributes are not prohibited for the element's role"
    },
    {
        id: 21,
        name: "aria attributes must be used as specified for the element's role",
        description: "aria attributes must be used as specified for the element's role",
        wcagLink: "",
        fix: "ensure aria attributes are used correctly for the element's role"
    }
]