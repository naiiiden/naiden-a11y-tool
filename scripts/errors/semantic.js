export const semanticErrors = [
  {
    type: "semantic",
    id: 0,
    name: "No first level heading",
    description: "Page is missing first level heading",
    wcagLinks: [
      {
        name: "Using <h1>-<h6> to identify headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H42",
      },
      {
        name: "Headings and Labels (Level AA)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html",
      },
      {
        name: "Using role=\"heading\" to identify headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA12",
      },
      {
        name: "Providing descriptive headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G130",
      },
      {
        name: "Organizing a page using headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G141",
      },
    ],
    fix: "Add <h1> tag",
  },
  {
    type: "semantic",
    id: 1,
    name: "Skipped heading level",
    description: "Heading level skipped",
    wcagLinks: [
      {
        name: "Using <h1>-<h6> to identify headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H42",
      },
      {
        name: "Organizing a page using headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G141",
      },
      {
        name: "Using role=heading to identify headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA12",
      },
    ],
    fix: "Reorder headings and make sure levels are in order",
  },
  {
    type: "semantic",
    id: 2,
    name: "Possible heading",
    description: "A <p> element looks like a heading",
    wcagLinks: [
      {
        name: "Info and Relationships (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
      },
      {
        name: "Failure of Success Criterion 1.3.1 due to using changes in text presentation to convey information without using the appropriate markup or text",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F2",
      },
    ],
    fix: "Use a heading element",
  },
  {
    type: "semantic",
    id: 3,
    name: "No headings",
    description: "No headings on the page",
    wcagLinks: [
      {
        name: "Using h1-h6 to identify headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H42",
      },
      {
        name: "Organizing a page using headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G141",
      },
      {
        name: "Using role=heading to identify headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA12",
      },
    ],
    fix: "Add headings",
  },
  {
    type: "semantic",
    id: 4,
    name: "No page regions",
    description: "No page regions or aria landmarks on the page",
    wcagLinks: [
      {
        name: "Using ARIA landmarks to identify regions of a page",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11",
      },
      {
        name: "Using the region role to identify a region of the page",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA20",
      },
      {
        name: "Using semantic HTML elements to identify regions of a page",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H101",
      },
    ],
    fix: "Use semantic tags to define regions",
  },
  {
    type: "semantic",
    id: 5,
    name: "Page must have one <main> tag",
    description: "Page must have a <main> tag",
    wcagLinks: [
      {
        name: "Using ARIA landmarks to identify regions of a page",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11",
      },
      {
        name: "Using semantic HTML elements to identify regions of a page",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H101",
      },
      {
        name: "The main landmark examples",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/main.html",
      },
    ],
    fix: "Add <main> tag",
  },
  {
    type: "semantic",
    id: 6,
    name: "Page should not have more than one <main> tag",
    description: "Page must have only one <main> tag",
    wcagLinks: [
      {
        name: "The <main> element",
        url: "https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element%3Athe-main-element",
      },
      {
        name: "The main landmark examples",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/main.html",
      },
    ],
    fix: "Leave only one <main> tag",
  },
  {
    type: "semantic",
    id: 7,
    name: "Page should not have more than one banner landmark",
    description: "Page must have only one banner landmark",
    wcagLinks: [
      {
        name: "The banner landmark",
        url: "https://www.w3.org/TR/wai-aria-1.3/#banner",
      },
      {
        name: "The banner landmark examples",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/banner.html",
      },
    ],
    fix: "Leave only one banner landmark",
  },
  {
    type: "semantic",
    id: 8,
    name: "Page should not have more than one contentinfo landmark",
    description: "Page must have only one contentinfo landmark",
    wcagLinks: [
      {
        name: "The banner landmark",
        url: "https://www.w3.org/TR/wai-aria-1.3/#contentinfo",
      },
      {
        name: "The contentinfo landmark examples",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/contentinfo.html",
      },
    ],
    fix: "Leave only one contentinfo landmark",
  },
  {
    type: "semantic",
    id: 9,
    name: '<header> or role="banner" landmark should not be contained in another landmark',
    description:
      '<header> or role="banner" landmark is contained in another landmark',
    wcagLinks: [
      {
        name: "Landmark Regions",
        url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#landmarkroles",
      },
      {
        name: "The banner landmark examples",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/banner.html",
      },
    ],
    fix: '<header> or role="banner" landmark should be at top level',
  },
  {
    type: "semantic",
    id: 10,
    name: '<aside> or role="complementary" should not be contained in another landmark',
    description:
      '<aside> or role="complementary" is contained in another landmark',
    wcagLinks: [
      {
        name: "Landmark Regions",
        url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#landmarkroles",
      },
      {
        name: "The complementary landmark examples",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/complementary.html",
      },
    ],
    fix: '<aside> or role="complementary" should be top level',
  },
  {
    type: "semantic",
    id: 11,
    name: '<footer> or role="contentinfo" landmark should not be contained in another landmark',
    description:
      '<footer> or role="contentinfo" landmark is contained in another landmark',
    wcagLinks: [
      {
        name: "Landmark Regions",
        url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#landmarkroles",
      },
      {
        name: "The contentinfo landmark examples",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/contentinfo.html",
      },
    ],
    fix: '<footer> or role="contentinfo" landmark should be top level',
  },
  {
    type: "semantic",
    id: 12,
    name: '<main> or role="main" landmark should not be contained in another landmark',
    description:
      '<main> or role="main" landmark is contained in another landmark',
    wcagLinks: [
      {
        name: "Landmark Regions",
        url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#landmarkroles",
      },
      {
        name: "The main landmark examples",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/main.html",
      },
    ],
    fix: '<main> or role="main" landmark should be top level',
  },
  {
    type: "semantic",
    id: 13,
    name: "Page content should be contained by landmarks",
    description: "Element is not contained by landmarks",
    wcagLinks: [
      {
        name: "Using ARIA landmarks to identify regions of a page",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11",
      },
      {
        name: "Using the region role to identify a region of the page",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA20",
      },
      {
        name: "Using semantic HTML elements to identify regions of a page",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H101",
      },
      {
        name: "Info and Relationships (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
      },
    ],
    fix: "Ensure all page content is contained by landmarks",
  },
  {
    type: "semantic",
    id: 14,
    name: "<ul> and <ol> must only directly contain <li>, <script> or <template> elements",
    description: "<ul> or <ol> contains a direct child element that is not a <li>, <script> or <template>",
    wcagLinks: [
      {
        name: "Using <ol>, <ul> and <dl> for lists or groups of links",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H48",
      },
      {
        name: "Info and Relationships (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
      },
    ],
    fix: "Ensure that lists are structured properly",
  },
  {
    type: "semantic",
    id: 15,
    name: "<li> elements must be contained in an <ul> or <ol>",
    description: "<li> element is not contained in an <ul> or <ol> element",
    wcagLinks: [
      {
        name: "Using <ol>, <ul> and <dl> for lists or groups of links",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H48",
      },
      {
        name: "Info and Relationships (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
      },
    ],
    fix: "Ensures <li> elements are used semantically",
  },
  {
    type: "semantic",
    id: 16,
    name: "<dl> elements must only directly contain properly-ordered <dt> and <dd> groups, <script>, <template> or <div> elements",
    description:
      "<dl> element contains a direct child element that is not a properly-ordered <dt> and <dd> groups, <script>, <template> or <div> elements",
    wcagLinks: [
      {
        name: "Using description lists",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H40",
      },
      {
        name: "Using <ol>, <ul> and <dl> for lists or groups of links",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H48",
      },
      {
        name: "Info and Relationships (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
      },
    ],
    fix: "Ensure that all <dl> elements are structured correctly.",
  },
  {
    type: "semantic",
    id: 17,
    name: "<dt> and <dd> elements must be contained by a <dl> element",
    description: "<dt> or <dd> element is not contained by a <dl> element",
    wcagLinks: [
      {
        name: "Using description lists",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H40",
      },
      {
        name: "Using <ol>, <ul> and <dl> for lists or groups of links",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H48",
      },
      {
        name: "Info and Relationships (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
      },
    ],
    fix: "Ensure that all <dt> and <dd> elements are contained by a <dl>.",
  },
  {
    type: "semantic",
    id: 18,
    name: "Page must have means to bypass repeated blocks",
    description: "Page doesn't have means to bypass repeated blocks",
    wcagLinks: [
      {
        name: "Bypass Blocks (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks",
      },
      {
        name: "Adding a link at the top of each page that goes directly to the main content area",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G1.html",
      },
      {
        name: "Providing heading elements at the beginning of each section of content",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H69",
      },
      {
        name: "Adding a link at the beginning of a block of repeated content to go to the end of the block",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G123",
      },
      {
        name: "Adding links at the top of the page to each area of the content",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G124",
      },
      {
        name: "Using ARIA landmarks to identify regions of a page",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11",
      },
    ],
    fix: "Each page must have a main landmark to provide a mechanism to bypass repeated blocks of content or interface elements",
  },
  {
    type: "semantic",
    id: 19,
    name: "Ids must be unique",
    description: "Id is not unique",
    wcagLinks: "",
    fix: "Ensure ids are not duplicated",
  },
  {
    type: "semantic",
    id: 20,
    name: "Elements should not have tabindex greater than 0",
    description: "Element has tabindex greater than 0",
    wcagLinks: [
      {
        name: "Focus Order (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order",
      },
      {
        name: "Failure of Success Criterion 2.4.3 due to using tabindex to create a tab order that does not preserve meaning and operability",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F44.html",
      },
    ],
    fix: "Ensure tabindex values greater than 0 are never used",
  },
  {
    type: "semantic",
    id: 21,
    name: "Landmarks should be unique",
    description: "Landmarks is not unique",
    wcagLinks: [
      {
        name: "General Principles of Landmark Design",
        url: "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#generalprinciplesoflandmarkdesign",
      },
    ],
    fix: "Ensure landmarks have a unique label/title",
  },
];
