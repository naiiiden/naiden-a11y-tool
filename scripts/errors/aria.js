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
        id: 13,
        name: "aria role should be appropriate for the element",
        description: "aria role should be appropriate for the element",
        wcagLink: "",
        fix: "ensure elements with role attribute have appropriate value for the element"
    }
]