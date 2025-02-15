export const interactiveElementsErrors = [
    {
        type: "interactive",
        id: 0,
        name: "Empty link",
        description: "Some links don't have text.",
        wcagLinks: [
            {
                "name": "Providing link text that describes the purpose of a link for anchor elements",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H30"
            },
            {
                "name": "Supplementing link text with the title attribute",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H33"
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
            },
            {
                "name": "Name, Role, Value (Level A)",
                "url": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html"
            },
            {
                "name": "Link Purpose (In Context) (Level A)",
                "url": "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html"
            },
        ],
        fix: "Add descriptive alt text to all button images.",
    },
    {
        type: "interactive",
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
            },
            {
                "name": "Name, Role, Value (Level A)",
                "url": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html"
            },
        ],
        fix: "Add descriptive text to all buttons.",
    },
    {
        type: "interactive",
        id: 2,
        name: "Broken skip link",
        description: "Skip link's target doesn't exist or it's not accessible by keyboard",
        wcagLinks: [
            {
                "name": "Adding a link at the top of each page that goes directly to the main content area",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G1"
            },
            {
                "name": "Bypass Blocks (Level A)",
                "url": "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks"
            },
        ],
        fix: "Skip link's target should match the id or name value of landmark element"
    },
    {
        type: "interactive",
        id: 3,
        name: "Interactive control element has focusable children",
        description: "Interactive control element has focusable children",
        wcagLinks: [
            {
                "name": "Name, Role, Value (Level A)",
                "url": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html"
            },
        ],
        fix: "Control must not have focusable children"
    },
    {
        type: "interactive",
        id: 4,
        name: "Broken same-page link",
        description: "Link to another location within the page is present but doesn't have a corresponding target",
        wcagLinks: [
            {
                "name": "Bypass Blocks (Level A)",
                "url": "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks"
            },
            {
                "name": "Adding a link at the top of each page that goes directly to the main content area",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G1.html"
            },
            {
                "name": "Providing heading elements at the beginning of each section of content",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H69"
            },
            {
                "name": "Adding a link at the beginning of a block of repeated content to go to the end of the block",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G123"
            },
            {
                "name": "Adding links at the top of the page to each area of the content",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G124"
            },
            {
                "name": "Using ARIA landmarks to identify regions of a page",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11"
            }
        ],
        fix: "Ensure the target for the link exists or remove the link"
    },
    {
        type: "interactive",
        id: 5,
        name: "Scrollable region must have keyboard access",
        description: "Scrollable region must have keyboard access",
        wcagLinks: [
            {
                "name": "Keyboard (Level A)",
                "url": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
            },
            {
                "name": "Keyboard (No Exception) (Level AAA)",
                "url": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard-no-exception.html"
            },
            {
                "name": "Ensuring keyboard control for all functionality",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G202"
            },
            {
                "name": "Scrollable content can be reached with sequential focus navigation",
                "url": "https://www.w3.org/WAI/standards-guidelines/act/rules/0ssw9k/"
            }
        ],
        fix: "Ensure that scrollable region has keyboard access"
    },
    {
        type: "interactive",
        id: 6,
        name: "accesskeys must be unique",
        description: "accesskeys must be unique",
        wcagLinks: "",
        fix: "ensure accesskeys are not duplicated",
      },
      {
        type: "interactive",
        id: 7,
        name: "all touch targets must be 24px large, or leave sufficient space",
        description: "all touch targets must be 24px large, or leave sufficient space",
        wcagLinks: [
            {
                "name": "Target Size (Minimum) (Level AA)",
                "url": "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum"
            },
            {
                "name": "Using min-height and min-width to ensure sufficient target spacing",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/css/C42"
            }
        ],
        fix: "touch targets must be at least 24 by 24 CSS pixels in size",
      },
]