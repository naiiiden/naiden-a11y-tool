export const rootAndMetadataErrors = [
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