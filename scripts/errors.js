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
    name: "Linked image missing alt attribute",
    description: "Some linked images are missing an alt attribute.",
    wcagLink: "",
    fix: "Add descriptive alt text to all linked images.",
  },
];