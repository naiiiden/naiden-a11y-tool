export const imageErrors = [
    {
        id: 0,
        name: "Image missing alt attribute",
        description: "Some images are missing an alt attribute.",
        wcagLinks: [
            {
                "name": "Using alt attributes on img elements",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H37"
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
            }
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
            }
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
                "url": "https://www.w3.org/WAI/WCAG21/Techniques/html/H24.html"
            }
        ],
        fix: "Add alt text to all img map areas.",
    },
    {
        id: 5,
        name: "role='img' elements must have an alt text",
        description: "role='img' elements must have an alt text.",
        wcagLinks: "",
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
        wcagLinks: "",
        fix: "Add alt text to all svg elements with role='img'",
    },
    {
        id: 8,
        name: "alt text of button and link images should not be repeated as text",
        description: "alt text of button or link images should not be repeated as text",
        wcagLinks: "",
        fix: "ensure button and link text is not repeated as img alt text",
    },
]