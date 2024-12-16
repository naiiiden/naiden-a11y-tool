export const interactiveElementsErrors = [
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
    },
    {
        id: 5,
        name: "Scrollable region must have keyboard access",
        description: "Scrollable region must have keyboard access",
        wcagLink: "",
        fix: "Ensure that scrollable region has keyboard access"
    },
    {
        id: 6,
        name: "accesskeys must be unique",
        description: "accesskeys must be unique",
        wcagLink: "",
        fix: "ensure accesskeys are not duplicated",
      },
      {
        id: 7,
        name: "all touch targets must be 24px large, or leave sufficient space",
        description: "all touch targets must be 24px large, or leave sufficient space",
        wcagLink: "",
        fix: "touch targets must be at least 24 by 24 CSS pixels in size",
      },
]