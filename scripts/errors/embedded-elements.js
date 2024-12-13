export const embeddedElementsErrors = [
    {
        id: 0,
        name: "Empty or missing iframe title",
        description: "Some iframes have an empty or missing title.",
        wcagLink: "",
        fix: "Add text to the empty iframe.",
    },
    {
        id: 1,
        name: "object elements must have alt text",
        description: "object elements must have alt text",
        wcagLink: "",
        fix: "Ensures every object element has alt text",
    },
    {
        id: 2,
        name: "frames must have a unique title attribute",
        description: "frames must have a unique title attribute",
        wcagLink: "",
        fix: "Ensure all iframe/frame elements contain a unique title attribute",
    },
    {
        id: 3,
        name: "video or audio elements must not autoplay",
        description: "video or audio elements must not autoplay",
        wcagLink: "",
        fix: "Ensure all video or audio elements do not autoplay",
    },
    {
        id: 4,
        name: "video elements must have captions",
        description: "video elements must have captions",
        wcagLink: "",
        fix: "ensure video elements have captions",
    }
]