export const htmlAndHeadErrors = [
  {
    id: 0,
    name: "Page lang attribute missing or invalid",
    description:
      "The page is missing language attribute or its value is invalid",
    wcagLink: "",
    fix: "Add a valid lang attribute value",
  },
  {
    id: 1,
    name: "Page title missing",
    description: "The page is missing a title or the title is empty.",
    wcagLink: "https://www.w3.org/WAI/WCAG21/quickref/#headings-and-labels",
    fix: "Add a descriptive title to the page.",
  },
  {
    id: 2,
    name: "Page refreshes or redirects automatically",
    description: "Page refreshes or redirects automatically.",
    wcagLink: "https://www.w3.org/WAI/WCAG21/quickref/#headings-and-labels",
    fix: "Remove the <meta> refresh tag.",
  },
];

export const linkAndButtonErrors = [
  {
    id: 0,
    name: "Image missing alt attribute",
    description: "Some images are missing an alt attribute.",
    wcagLink: "https://www.w3.org/WAI/WCAG21/quickref/#non-text-content",
    fix: "Add descriptive alt text to all images.",
  },
  {
    id: 1,
    name: "Linked image missing alt attribute",
    description: "Some linked images are missing an alt attribute.",
    wcagLink: "https://www.w3.org/WAI/WCAG21/quickref/#non-text-content",
    fix: "Add descriptive alt text to all linked images.",
  },
];