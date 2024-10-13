export const htmlAndHeadErrors = [
  {
    id: 0,
    name: "Page lang attribute missing or invalid",
    description: "The page is missing language attribute or its value is invalid",
    wcagLink: "",
    fix: "Add a valid lang attribute value",
  },
  {
    id: 1,
    name: "Page title missing",
    description: "The page is missing a title or the title is empty.",
    wcagLink: "",
    fix: "Add a descriptive title to the page.",
  },
  {
    id: 2,
    name: "Page refreshes or redirects automatically",
    description: "Page refreshes or redirects automatically.",
    wcagLink: "",
    fix: "Remove the <meta> refresh tag.",
  },
  {
    id: 3,
    name: "Disabled text scaling and zooming",
    description: "viewport meta disables text scaling and zooming.",
    wcagLink: "",
    fix: "Remove the meta viewport 'user-scalable=no' attribute or set its value to yes or 1, but not no or 1.",
  },
];

export const imageLinkAndButtonErrors = [
  {
    id: 0,
    name: "Image missing alt attribute",
    description: "Some images are missing an alt attribute.",
    wcagLink: "",
    fix: "Add descriptive alt text to all images.",
  },
  {
    id: 1,
    name: "Linked image missing alt attribute or alt value is empty",
    description: "Some linked images are missing an alt attribute or its value is empty.",
    wcagLink: "",
    fix: "Add descriptive alt text to all linked images.",
  },
  {
    id: 2,
    name: "Button image missing alt attribute or alt value is empty",
    description: "Some button images are missing an alt attribute or its value is empty.",
    wcagLink: "",
    fix: "Add descriptive alt text to all button images.",
  },
  {
    id: 3,
    name: "Empty link",
    description: "Some links don't have text.",
    wcagLink: "",
    fix: "Add descriptive alt text to all button images.",
  },
  {
    id: 4,
    name: "Empty button",
    description: "Some button don't have text.",
    wcagLink: "",
    fix: "Add descriptive text to all buttons.",
  },
  {
    id: 5,
    name: "Image map missing alt text",
    description: "Image map missing alt text.",
    wcagLink: "",
    fix: "Add alt text to all img maps.",
  },
  {
    id: 6,
    name: "Image map area missing alt text",
    description: "Image map area missing alt text.",
    wcagLink: "",
    fix: "Add alt text to all img map areas.",
  },
  {
    id: 7,
    name: "Broken skip link",
    description: "Skip link's target doesn't exist or it's not accessible by keyboard",
    wcagLink: "",
    fix: "Skip link's target should match the id or name value of landmark element"
  },
  {
    id: 8,
    name: "Interactive control element has focusable children",
    description: "Interactive control element has focusable children",
    wcagLink: "",
    fix: "Control must not have focusable children"
  },
  {
    id: 9,
    name: "Broken same-page link",
    description: "Link to another location within the page is present but doesn't have a corresponding target",
    wcagLink: "",
    fix: "Ensure the target for the link exists or remove the link"
  }
];

export const emptyErrors = [
  {
    id: 0,
    name: "Empty heading",
    description: "A heading is empty.",
    wcagLink: "",
    fix: "Add text to the empty heading.",
  },
  {
    id: 1,
    name: "Empty table header",
    description: "Some table headers empty.",
    wcagLink: "",
    fix: "Add text to the empty table header.",
  },
  {
    id: 2,
    name: "Empty or missing iframe title",
    description: "Some iframes have an empty or missing title.",
    wcagLink: "",
    fix: "Add text to the empty iframe.",
  },
  {
    id: 3,
    name: "Empty or missing summary",
    description: "Summary element is empty or missing.",
    wcagLink: "",
    fix: "Add summary.",
  },
]

export const formErrors = [
  {
    id: 0,
    name: "Empty form label",
    description: "Form label is empty",
    wcagLink: "",
    fix: "Add text to the empty form label",
  },
  {
    id: 1,
    name: "Form control missing label",
    description: "Form control doesn't have a label",
    wcagLink: "",
    fix: "Add a label for the form control",
  },
  {
    id: 2,
    name: "Form control multiple form labels",
    description: "Form control has more than 1 label",
    wcagLink: "",
    fix: "Leave only one label for the form control",
  },
  {
    id: 3,
    name: "Fieldset doesn't have legend",
    description: "Legend describes the elements contained by a fieldset",
    wcagLink: "",
    fix: "Add legend",
  },
  {
    id: 4,
    name: "Missing fieldset",
    description: "Two or more radio buttons or checkboxes with the same name are not contained by a fieldset",
    wcagLink: "",
    fix: "Add fieldset",
  },
  {
    id: 5,
    name: "Empty submit or button input value",
    description: "Submit or button input value is empty",
    wcagLink: "",
    fix: "Add text to value",
  }
]

export const semanticErrors = [
  {
    id: 0,
    name: "No first level heading",
    description: "No first level heading on the page",
    wcagLink: "",
    fix: "Add h1 tag",
  },
  {
    id: 1,
    name: "Skipped heading level",
    description: "Heading level skipped",
    wcagLink: "",
    fix: "Reorder headings and make sure levels are in order",
  },
  {
    id: 2,
    name: "Possible heading",
    description: "A <p> tag looks like a heading",
    wcagLink: "",
    fix: "Use a heading element",
  },
  {
    id: 3,
    name: "No headings",
    description: "No headings on the page",
    wcagLink: "",
    fix: "Add headings",
  },
  {
    id: 4,
    name: "No page regions",
    description: "No page regions or aria landmarks on the page",
    wcagLink: "",
    fix: "Use semantic tags to define regions",
  },
  {
    id: 5,
    name: "Page must have one main tag",
    description: "Page must have a main tag",
    wcagLink: "",
    fix: "Add main tag",
  },
  {
    id: 6,
    name: "Page should not have more than one main tag",
    description: "Page must have only one main tag",
    wcagLink: "",
    fix: "Leave only one main tag",
  }
]

const cssErrors = [
  {
    id: 0,
    name: "Very small text",
    description: "Text is hard to read",
    wcagLink: "",
    fix: "Make it larger",
  },
  {
    id: 1,
    name: "Underlined text",
    description: "Text is underlined and looks like a link",
    wcagLink: "",
    fix: "Remove underline",
  }
]