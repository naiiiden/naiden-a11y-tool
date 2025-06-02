export const rootAndMetadataErrors = [
  {
    type: "root-and-metadata",
    id: 0,
    name: '<html> element is missing a"lang" attribute',
    description: 'The page is missing a "lang" attribute',
    wcagLinks: [
      {
        name: 'Using the "lang" attribute on the <html> element',
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H57",
      },
      {
        name: '<html> page has "lang" attribute',
        url: "https://www.w3.org/WAI/standards-guidelines/act/rules/b5c3f8/",
      },
      {
        name: '<html> page "lang" attribute has valid language tag',
        url: "https://www.w3.org/WAI/standards-guidelines/act/rules/bf051a/",
      },
      {
        name: "Language of Page (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html",
      },
    ],
    fix: 'Ensure that the <html> element has a "lang" attribute',
  },
  {
    type: "root-and-metadata",
    id: 1,
    name: '<html> element has an invalid "lang" attribute value',
    description: 'The page\'s "lang" attribute value is invalid',
    wcagLinks: [
      {
        name: 'Using the "lang" attribute on the <html> element',
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H57",
      },
      {
        name: '<html> page "lang" attribute has valid language tag',
        url: "https://www.w3.org/WAI/standards-guidelines/act/rules/bf051a/",
      },
      {
        name: "Language of Page (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html",
      },
    ],
    fix: 'Ensure that the <html> element has a valid "lang" attribute value',
  },
  {
    type: "root-and-metadata",
    id: 2,
    name: "Document <title> element is missing or it's empty",
    description: "The document is missing a <title> element or it has one but it's empty",
    wcagLinks: [
      {
        name: "Providing a document title using the <title> element",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H25",
      },
      {
        name: "HTML page has non-empty title",
        url: "https://www.w3.org/WAI/standards-guidelines/act/rules/2779a5/",
      },
      {
        name: "Page Titled (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html",
      },
    ],
    fix: "Add a non-empty <title> to the page",
  },
  {
    type: "root-and-metadata",
    id: 3,
    name: "Page refreshes or redirects automatically",
    description: "Page refreshes or redirects automatically.",
    wcagLinks: [
      {
        name: 'Using <meta> "refresh" to create an instant client-side redirect',
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H76",
      },
      {
        name: "<meta> element has no refresh delay",
        url: "https://www.w3.org/WAI/standards-guidelines/act/rules/bc659a/",
      },
      {
        name: "<meta> element has no refresh delay (no exception)",
        url: "https://www.w3.org/WAI/standards-guidelines/act/rules/bisz58/",
      },
      {
        name: "Failure of Success Criterion 2.2.1, 2.2.4, and 3.2.5 due to using meta refresh to reload the page",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F41.html",
      },
    ],
    fix: "Remove the <meta> refresh tag.",
  },
  {
    type: "root-and-metadata",
    id: 4,
    name: "Disabled text scaling and zooming",
    description: "Viewport meta disables text scaling and zooming.",
    wcagLinks: [
      {
        name: "Reflow (Level AA)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/reflow.html",
      },
      {
        name: "Meta viewport allows for zoom",
        url: "https://www.w3.org/WAI/standards-guidelines/act/rules/b4f0c3/",
      },
    ],
    fix: "Remove the meta viewport 'user-scalable=no' attribute or set its value to yes or 1, but not no or 1.",
  },
  {
    type: "root-and-metadata",
    id: 5,
    name: "Users should be able to zoom and scale the text up to 500%",
    description: "Users should be able to zoom and scale the text up to 500%",
    wcagLinks: [
      {
        name: "Resize Text (Level AA)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html",
      },
      {
        name: "Meta viewport allows for zoom",
        url: "https://www.w3.org/WAI/standards-guidelines/act/rules/b4f0c3/",
      },
    ],
    fix: "Ensures that the user-scalable=no parameter is not present in the <meta name=viewport> element and the maximum-scale parameter is not less than 500%",
  },
];
