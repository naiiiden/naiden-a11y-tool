export const imageErrors = [
    {
        id: 0,
        name: "Image missing alt attribute",
        description: "Some images are missing an alt attribute.",
        wcagLinks: [
            {
                "name": "Using alt attributes on img elements",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H37"
            },
            {
                "name": "Non-text Content (Level A)",
                "url": "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html"
            },
            {
                "name": "Failure of Success Criterion 1.1.1 due to omitting the alt attribute or text alternative on img elements, area elements, and input elements of type \"image\"",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/failures/F65.html"
            },
            {
                "name": "An alt Decision Tree",
                "url": "https://www.w3.org/WAI/tutorials/images/decision-tree/"
            },
            {
                "name": "Using aria-labelledby to provide a text alternative for non-text content",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA10.html"
            },
            {
                "name": "Using null alt text and no title attribute on img elements for images that assistive technology should ignore",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H67.html"
            }
        ],
        fix: "Add descriptive alt text to all images.",
    },
    {
        id: 1,
        name: "Linked image missing alt attribute or alt value is empty",
        description: "Some linked images are missing an alt attribute or its value is empty.",
        wcagLinks: [
            {
                "name": "Using alt attributes on img elements",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H37"
            },
            {
                "name": "Example 1: Image used alone as a linked logo",
                "url": "https://www.w3.org/WAI/tutorials/images/functional/#example-1-image-used-alone-as-a-linked-logo"
            },
            {
                "name": "Example 2: Logo image within link text",
                "url": "https://www.w3.org/WAI/tutorials/images/functional/#logo-image-within-link-text"
            },
            {
                "name": "Example 3: Icon image conveying information within link text",
                "url": "https://www.w3.org/WAI/tutorials/images/functional/#logo-image-within-link-text"
            },
            {
                "name": "An alt Decision Tree",
                "url": "https://www.w3.org/WAI/tutorials/images/decision-tree/"
            },
            {
                "name": "Non-text Content (Level A)",
                "url": "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html"
            },
        ],
        fix: "Add descriptive alt text to all linked images.",
    },
    {
        id: 2,
        name: "Button image missing alt attribute or alt value is empty",
        description: "Some button images are missing an alt attribute or its value is empty.",
        wcagLinks: [
            {
                "name": "Using alt attributes on img elements",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H37"
            },
            {
                "name": "Using alt attributes on images used as submit buttons",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H36"
            },
            {
                "name": "Example 5: Image used in a button",
                "url": "https://www.w3.org/WAI/tutorials/images/functional/#example-5-image-used-in-a-button"
            },
            {
                "name": "An alt Decision Tree",
                "url": "https://www.w3.org/WAI/tutorials/images/decision-tree/"
            },
            {
                "name": "Non-text Content (Level A)",
                "url": "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html"
            },
        ],
        fix: "Add descriptive alt text to all button images.",
    },
    {
        id: 3,
        name: "Image \"img[usemap]\" map missing alt text",
        description: "Image map missing alt text.",
        wcagLinks: [
            {
                "name": "Using alt attributes on img elements",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H37"
            }
        ],
        fix: "Add alt text to all img maps.",
    },
    {
        id: 4,
        name: "Image map area missing alt text",
        description: "Image map area missing alt text.",
        wcagLinks: [
            {
                "name": "Providing text alternatives for the area elements of image maps",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H24.html"
            }
        ],
        fix: "Add alt text to all img map areas.",
    },
    {
        id: 5,
        name: "role='img' elements must have an alt text",
        description: "role='img' elements must have an alt text.",
        wcagLinks: [
            {
                "name": "Using aria-label to provide labels for objects",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6"
            }, 
            {
                "name": "Using aria-describedby to provide descriptions of images",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA15"
            },
            {
                "name": "Non-text Content (Level A)",
                "url": "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html"
            },
            {
                "name": "Using aria-labelledby to provide a text alternative for non-text content",
                "url": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA10.html"
            }
        ],
        fix: "Add alt text to all role='img' elements.",
    },
    {
        id: 6,
        name: "server side img maps must not be used",
        description: "server side img maps must not be used",
        wcagLinks: "",
        fix: "ensure server side img maps are not used",
    },
    {
        id: 7,
        name: "svg elements with role='img' must have an alt text",
        description: "svg elements with role='img' must have an alt text.",
        wcagLinks: [
            {
                "name": "Using aria-label to provide labels for objects",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6"
            }, 
            {
                "name": "Using aria-describedby to provide descriptions of images",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA15"
            },
            {
                "name": "Non-text Content (Level A)",
                "url": "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html"
            },
            {
                "name": "Using aria-labelledby to provide a text alternative for non-text content",
                "url": "https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA10.html"
            }
        ],
        fix: "Add alt text to all svg elements with role='img'",
    },
    {
        id: 8,
        name: "alt text of button and link images should not be repeated as text",
        description: "alt text of button or link images should not be repeated as text",
        wcagLinks: [
            {
                "name": "Combining adjacent image and text links for the same resource",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H2.html"
            }
        ],
        fix: "ensure button and link text is not repeated as img alt text",
    },
]