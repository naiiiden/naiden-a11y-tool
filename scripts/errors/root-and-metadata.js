export const rootAndMetadataErrors = [
    {
      id: 0,
      name: "<html> element is missing a\"lang\" attribute",
      description: "The page is missing a \"lang\" attribute",
      wcagLink: "https://www.w3.org/WAI/WCAG22/Techniques/html/H57",
      fix: "Ensure that the <html> element has a \"lang\" attribute",
    },
    {
      id: 1,
      name: "<html> element has an invalid \"lang\" attribute value",
      description: "The page's \"lang\" attribute value is invalid",
      wcagLink: "https://www.w3.org/WAI/WCAG22/Techniques/html/H57",
      fix: "Ensure that the <html> element has a valid \"lang\" attribute value",
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
    {
      id: 5,
      name: "Users should be able to zoom and scale the text up to 500%",
      description: "Users should be able to zoom and scale the text up to 500%",
      wcagLink: "",
      fix: "Ensures that the user-scalable=no parameter is not present in the <meta name=viewport> element and the maximum-scale parameter is not less than 500%",
    },
];