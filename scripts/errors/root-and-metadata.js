export const rootAndMetadataErrors = [
    {
      id: 0,
      name: "<html> element is missing a\"lang\" attribute",
      description: "The page is missing a \"lang\" attribute",
      wcagLinks: [
        {
          "name": "Using the language attribute on the HTML element",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H57",
        }, 
        {
          "name": "HTML page has lang attribute",
          "url": "https://www.w3.org/WAI/standards-guidelines/act/rules/b5c3f8/",
        },
        {
          "name": "HTML page lang attribute has valid language tag",
          "url": "https://www.w3.org/WAI/standards-guidelines/act/rules/bf051a/",
        }
      ],
      fix: "Ensure that the <html> element has a \"lang\" attribute",
    },
    {
      id: 1,
      name: "<html> element has an invalid \"lang\" attribute value",
      description: "The page's \"lang\" attribute value is invalid",
      wcagLinks: "https://www.w3.org/WAI/WCAG22/Techniques/html/H57",
      fix: "Ensure that the <html> element has a valid \"lang\" attribute value",
    },
    {
      id: 2,
      name: "Document <title> element is missing or it's empty",
      description: "The document is missing a <title> element or it has one but it's empty",
      wcagLinks: "https://www.w3.org/WAI/WCAG22/Techniques/html/H25",
      fix: "Add a non-empty <title> to the page",
    },
    {
      id: 3,
      name: "Page refreshes or redirects automatically",
      description: "Page refreshes or redirects automatically.",
      wcagLinks: "",
      fix: "Remove the <meta> refresh tag.",
    },
    {
      id: 4,
      name: "Disabled text scaling and zooming",
      description: "viewport meta disables text scaling and zooming.",
      wcagLinks: "",
      fix: "Remove the meta viewport 'user-scalable=no' attribute or set its value to yes or 1, but not no or 1.",
    },
    {
      id: 5,
      name: "Users should be able to zoom and scale the text up to 500%",
      description: "Users should be able to zoom and scale the text up to 500%",
      wcagLinks: "",
      fix: "Ensures that the user-scalable=no parameter is not present in the <meta name=viewport> element and the maximum-scale parameter is not less than 500%",
    },
];