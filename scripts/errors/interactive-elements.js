export const interactiveElementsErrors = [
    {
        id: 0,
        name: "Empty link",
        description: "Some links don't have text.",
        wcagLinks: [
            {
                "name": "Providing link text that describes the purpose of a link for anchor elements",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H30"
            },
            {
                "name": "Providing link text that describes the purpose of a link",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G91"
            },
            {
                "name": "Using aria-labelledby for link purpose", 
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA7"
            },
            {
                "name": "Using aria-label for link purpose", 
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA8"
            }
        ],
        fix: "Add descriptive alt text to all button images.",
    },
    {
        id: 1,
        name: "Empty button",
        description: "Some button don't have text.",
        wcagLinks: [
            {
                "name": "Using aria-label to provide an invisible label where a visible label cannot be used",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA14"
            },
            {
                "name": "Using aria-label to provide labels for objects",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6"
            }, 
            {
                "name": "Using aria-labelledby to provide a name for user interface controls",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16"
            }
        ],
        fix: "Add descriptive text to all buttons.",
    },
    {
        id: 2,
        name: "Broken skip link",
        description: "Skip link's target doesn't exist or it's not accessible by keyboard",
        wcagLinks: [
            {
                "name": "Adding a link at the top of each page that goes directly to the main content area",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G1"
            }
        ],
        fix: "Skip link's target should match the id or name value of landmark element"
    },
    {
        id: 3,
        name: "Interactive control element has focusable children",
        description: "Interactive control element has focusable children",
        wcagLinks: "",
        fix: "Control must not have focusable children"
    },
    {
        id: 4,
        name: "Broken same-page link",
        description: "Link to another location within the page is present but doesn't have a corresponding target",
        wcagLinks: "",
        fix: "Ensure the target for the link exists or remove the link"
    },
    {
        id: 5,
        name: "Scrollable region must have keyboard access",
        description: "Scrollable region must have keyboard access",
        wcagLinks: "",
        fix: "Ensure that scrollable region has keyboard access"
    },
    {
        id: 6,
        name: "accesskeys must be unique",
        description: "accesskeys must be unique",
        wcagLinks: "",
        fix: "ensure accesskeys are not duplicated",
      },
      {
        id: 7,
        name: "all touch targets must be 24px large, or leave sufficient space",
        description: "all touch targets must be 24px large, or leave sufficient space",
        wcagLinks: "",
        fix: "touch targets must be at least 24 by 24 CSS pixels in size",
      },
]