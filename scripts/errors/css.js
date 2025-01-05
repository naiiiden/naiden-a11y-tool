export const cssErrors = [
    {
      id: 0,
      name: "Very small text",
      description: "Text is hard to read",
      wcagLinks: "",
      fix: "Make it larger",
    },
    {
      id: 1,
      name: "Underlined text",
      description: "Text is underlined and looks like a link",
      wcagLinks: [
        {
          "name": "Underlining",
          "url": "https://design.canada.ca/style-guide/#wp4-2"
        }
      ],
      fix: "Remove underline",
    },
    {
      id: 2,
      name: "Text properties unadjustable with custom stylesheets",
      description: "Text properties unadjustable with custom stylesheets",
      wcagLinks: [
        {
          "name": "Text Spacing (Level AA)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html"
        }
      ],
      fix: "Ensure text properties are adjustable with custom stylesheets",
    },
]