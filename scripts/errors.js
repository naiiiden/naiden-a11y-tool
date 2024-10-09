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
    name: "Missing form label",
    description: "Form control doesn't have a label",
    wcagLink: "",
    fix: "Add a label for the form control",
  },
  {
    id: 2,
    name: "Multiple form labels",
    description: "Form control has more than 1 label",
    wcagLink: "",
    fix: "Leave only one label for the form control",
  }
]