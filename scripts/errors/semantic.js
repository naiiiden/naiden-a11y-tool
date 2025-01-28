export const semanticErrors = [
    {
      id: 0,
      name: "No first level heading",
      description: "No first level heading on the page",
      wcagLinks: [
        {
          "name": "Using h1-h6 to identify headings",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H42"
        }, 
        {
          "name": "Headings and Labels (Level AA)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html"
        },
        {
          "name": "Using role=heading to identify headings",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA12"
        },
        {
          "name": "Providing descriptive headings",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G130"
        },
        {
          "name": "Organizing a page using headings",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G141"
        }
      ],
      fix: "Add h1 tag",
    },
    {
      id: 1,
      name: "Skipped heading level",
      description: "Heading level skipped",
      wcagLinks: [
        {
          "name": "Using h1-h6 to identify headings",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H42"
        },
        {
          "name": "Organizing a page using headings",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G141"
        },
        {
          "name": "Using role=heading to identify headings",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA12"
        }
      ],
      fix: "Reorder headings and make sure levels are in order",
    },
    {
      id: 2,
      name: "Possible heading",
      description: "A <p> element looks like a heading",
      wcagLinks: [
        {
          "name": "Info and Relationships (Level A)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
        },
        {
          "name": "Failure of Success Criterion 1.3.1 due to using changes in text presentation to convey information without using the appropriate markup or text",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/failures/F2"
        }
      ],
      fix: "Use a heading element",
    },
    {
      id: 3,
      name: "No headings",
      description: "No headings on the page",
      wcagLinks: [
        {
          "name": "Using h1-h6 to identify headings",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H42"
        },
        {
          "name": "Organizing a page using headings",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G141"
        },
        {
          "name": "Using role=heading to identify headings",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA12"
        }
      ],
      fix: "Add headings",
    },
    {
      id: 4,
      name: "No page regions",
      description: "No page regions or aria landmarks on the page",
      wcagLinks: [
        {
          "name": "Using ARIA landmarks to identify regions of a page",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11"
        },
        {
          "name": "Using the region role to identify a region of the page",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA20"
        },
        {
          "name": "Using semantic HTML elements to identify regions of a page",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H101"
        }
      ],
      fix: "Use semantic tags to define regions",
    },
    {
      id: 5,
      name: "Page must have one <main> tag",
      description: "Page must have a main tag",
      wcagLinks: [
        {
          "name": "Using ARIA landmarks to identify regions of a page",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11"
        },
        {
          "name": "Using semantic HTML elements to identify regions of a page",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H101"
        },
        {
          "name": "The banner landmark examples",
          "url": "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/main.html"
        }
      ],
      fix: "Add main tag",
    },
    {
      id: 6,
      name: "Page should not have more than one main tag",
      description: "Page must have only one main tag",
      wcagLinks: [
        {
          "name": "The <main> element",
          "url": "https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element%3Athe-main-element"
        },
        {
          "name": "The banner landmark examples",
          "url": "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/main.html"
        }
      ],
      fix: "Leave only one main tag",
    },
    {
      id: 7,
      name: "Page should not have more than one banner landmark",
      description: "Page must have only one banner landmark",
      wcagLinks: [
        {
          "name": "The banner landmark",
          "url": "https://www.w3.org/TR/wai-aria-1.3/#banner"
        },
        {
          "name": "The banner landmark examples",
          "url": "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/banner.html"
        }
      ],
      fix: "Leave only one banner landmark",
    },
    {
      id: 8,
      name: "Page should not have more than one contentinfo landmark",
      description: "Page must have only one contentinfo landmark",
      wcagLinks: [
        {
          "name": "The banner landmark",
          "url": "https://www.w3.org/TR/wai-aria-1.3/#contentinfo"
        },
        {
          "name": "The banner landmark examples",
          "url": "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/contentinfo.html"
        }
      ],
      fix: "Leave only one contentinfo landmark",
    },
    {
      id: 9,
      name: "Header or role=\"banner\" landmark should not be contained in another landmark",
      description: "Header or role=\"banner\" landmark should not be contained in another landmark",
      wcagLinks: [
        {
          "name": "Landmark Regions",
          "url": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#landmarkroles"
        },
        {
          "name": "The banner landmark examples",
          "url": "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/banner.html"
        }
      ],
      fix: "Header or role=\"banner\" landmark should be at top level",
    },
    {
      id: 10,
      name: "Aside or role=\"complementary\" should not be contained in another landmark",
      description: "Aside or role=\"complementary\" should not be contained in another landmark",
      wcagLinks: [
        {
          "name": "Landmark Regions",
          "url": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#landmarkroles"
        },
        {
          "name": "The banner landmark examples",
          "url": "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/complementary.html"
        }
      ],
      fix: "Aside or role=\"complementary\" should be top level",
    },
    {
      id: 11,
      name: "Footer or role=\"contentinfo\" landmark should not be contained in another landmark",
      description: "Footer or role=\"contentinfo\" landmark should not be contained in another landmark",
      wcagLinks: [
        {
          "name": "Landmark Regions",
          "url": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#landmarkroles"
        },
        {
          "name": "The banner landmark examples",
          "url": "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/contentinfo.html"
        }
      ],
      fix: "Footer or role=\"contentinfo\" landmark should be top level",
    },
    {
      id: 12,
      name: "Main or role=\"main\" landmark should not be contained in another landmark",
      description: "Main or role=\"main\" landmark should not be contained in another landmark",
      wcagLinks: [
        {
          "name": "Landmark Regions",
          "url": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#landmarkroles"
        },
        {
          "name": "The banner landmark examples",
          "url": "https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/main.html"
        }
      ],
      fix: "Main or role=\"main\" landmark should be top level",
    },
    {
      id: 13,
      name: "Page content should be contained by landmarks",
      description: "Page content should be contained by landmarks",
      wcagLinks: [
        {
          "name": "Using ARIA landmarks to identify regions of a page",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11"
        },
        {
          "name": "Using the region role to identify a region of the page",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA20"
        },
        {
          "name": "Using semantic HTML elements to identify regions of a page",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H101"
        },
        {
          "name": "Info and Relationships (Level A)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
        }
      ],
      fix: "Ensure all page content is contained by landmarks",
    },
    {
      id: 14,
      name: "ul and ol must only directly contain li, script or template elements",
      description: "ul and ol must only directly contain li, script or template elements",
      wcagLinks: [
        {
          "name": "Using ol, ul and dl for lists or groups of links",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H48"
        },
        {
          "name": "Info and Relationships (Level A)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
        },
      ],
      fix: "Ensure that lists are structured properly",
    },
    {
      id: 15,
      name: "li elements must be contained in an ul or ol",
      description: "li elements must be contained in an ul or ol",
      wcagLinks: [
        {
          "name": "Using ol, ul and dl for lists or groups of links",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H48"
        },
        {
          "name": "Info and Relationships (Level A)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
        },
      ],
      fix: "Ensures li elements are used semantically",
    },
    {
      id: 16,
      name: "dl elements must only directly contain properly-ordered dt and dd groups, script, template or div elements",
      description: "dl elements must only directly contain properly-ordered dt and dd groups, script, template or div elements",
      wcagLinks: [
        {
          "name": "Using description lists",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H40"
        },
        {
          "name": "Using ol, ul and dl for lists or groups of links",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H48"
        },
        {
          "name": "Info and Relationships (Level A)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
        },
      ],
      fix: "Ensure that all dl elements are structured correctly.",
    },
    {
      id: 17,
      name: "dt and dd elements must be contained by a dl element",
      description: "dt and dd elements must be contained by a dl element",
      wcagLinks: [
        {
          "name": "Using description lists",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H40"
        },
        {
          "name": "Using ol, ul and dl for lists or groups of links",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H48"
        },
        {
          "name": "Info and Relationships (Level A)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
        },
      ],
      fix: "Ensure that all dt and dd elements are contained dl.",
    },
    {
      id: 18,
      name: "page must have means to bypass repeated blocks",
      description: "page must have means to bypass repeated blocks",
      wcagLinks: [
        {
          "name": "Bypass Blocks (Level A)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks"
        },
        {
          "name": "Adding a link at the top of each page that goes directly to the main content area",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G1.html"
        },
        {
          "name": "Providing heading elements at the beginning of each section of content",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H69"
        },
        {
          "name": "Adding a link at the beginning of a block of repeated content to go to the end of the block",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G123"
        },
        {
          "name": "Adding links at the top of the page to each area of the content",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G124"
        },
        {
          "name": "Using ARIA landmarks to identify regions of a page",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA11"
        }
      ],
      fix: "each page must have a main landmark to provide a mechanism to bypass repeated blocks of content or interface elements",
    },
    {
      id: 19,
      name: "ids must be unique",
      description: "ids must be unique",
      wcagLinks: "",
      fix: "ensure ids are not duplicated",
    },
    {
      id: 20,
      name: "elements should not have tabindex greater than 0",
      description: "elements should not have tabindex greater than 0",
      wcagLinks: [
        {
          "name": "Focus Order (Level A)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/focus-order"
        },
        {
          "name": "Failure of Success Criterion 2.4.3 due to using tabindex to create a tab order that does not preserve meaning and operability",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/failures/F44.html"
        }
      ],
      fix: "ensure tabindex values greater than 0 are never used",
    },
    {
      id: 21,
      name: "landmarks should be unique",
      description: "landmarks should be unique",
      wcagLinks: [
        {
          "name": "General Principles of Landmark Design",
          "url": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/#generalprinciplesoflandmarkdesign"
        }
      ],
      fix: "ensure landmarks have a unique label/title",
    }
]