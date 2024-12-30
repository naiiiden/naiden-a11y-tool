export const embeddedElementsErrors = [
    {
        id: 0,
        name: "Empty or missing iframe title",
        description: "Some iframes have an empty or missing title.",
        wcagLinks: [
            {
              "name": "Using the title attribute of the iframe element",
              "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H64"
            }
          ],
        fix: "Add text to the empty iframe.",
    },
    {
        id: 1,
        name: "object elements must have alt text",
        description: "object elements must have alt text",
        wcagLinks: [
            {
                "name": "Using the body of the object element",
                "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H53"
            }
        ],
        fix: "Ensures every object element has alt text",
    },
    {
        id: 2,
        name: "frames must have a unique title attribute",
        description: "frames must have a unique title attribute",
        wcagLinks: "",
        fix: "Ensure all iframe/frame elements contain a unique title attribute",
    },
    {
        id: 3,
        name: "video or audio elements must not autoplay",
        description: "video or audio elements must not autoplay",
        wcagLinks: "",
        fix: "Ensure all video or audio elements do not autoplay",
    },
    {
        id: 4,
        name: "video elements must have captions",
        description: "video elements must have captions",
        wcagLinks: "",
        fix: "ensure video elements have captions",
    }
]