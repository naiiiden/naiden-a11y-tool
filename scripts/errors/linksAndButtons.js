export const linksAndButtonsErrors = [
    {
        id: 0,
        name: "Empty link",
        description: "Some links don't have text.",
        wcagLink: "",
        fix: "Add descriptive alt text to all button images.",
    },
    {
        id: 1,
        name: "Empty button",
        description: "Some button don't have text.",
        wcagLink: "",
        fix: "Add descriptive text to all buttons.",
    },
    {
        id: 2,
        name: "Broken skip link",
        description: "Skip link's target doesn't exist or it's not accessible by keyboard",
        wcagLink: "",
        fix: "Skip link's target should match the id or name value of landmark element"
    },
    {
        id: 3,
        name: "Interactive control element has focusable children",
        description: "Interactive control element has focusable children",
        wcagLink: "",
        fix: "Control must not have focusable children"
    },
    {
        id: 4,
        name: "Broken same-page link",
        description: "Link to another location within the page is present but doesn't have a corresponding target",
        wcagLink: "",
        fix: "Ensure the target for the link exists or remove the link"
    }
]