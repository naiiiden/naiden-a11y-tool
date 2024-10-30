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
    }
]