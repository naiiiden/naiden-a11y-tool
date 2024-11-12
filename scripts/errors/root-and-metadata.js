export const rootAndMetadataErrors = [
    {
      id: 0,
      name: "Page lang attribute missing",
      description: "The page is missing language attribute",
      wcagLink: "",
      fix: "Add a valid lang attribute value",
    },
    {
      id: 1,
      name: "Page lang attribute invalid",
      description: "The page's language attribute value is invalid",
      wcagLink: "",
      fix: "Add a valid lang attribute value",
    },
    {
      id: 2,
      name: "Page title missing",
      description: "The page is missing a title or the title is empty.",
      wcagLink: "",
      fix: "Add a descriptive title to the page.",
    },
    {
      id: 3,
      name: "Page refreshes or redirects automatically",
      description: "Page refreshes or redirects automatically.",
      wcagLink: "",
      fix: "Remove the <meta> refresh tag.",
    },
    {
      id: 4,
      name: "Disabled text scaling and zooming",
      description: "viewport meta disables text scaling and zooming.",
      wcagLink: "",
      fix: "Remove the meta viewport 'user-scalable=no' attribute or set its value to yes or 1, but not no or 1.",
    },
];