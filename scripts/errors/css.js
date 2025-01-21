export const cssErrors = [
    {
      id: 0,
      name: "Very small text",
      description: "Text has font-size of 10px or less which is difficult to read",
      wcagLinks: "",
      fix: "Ensure the font-size of each text is larger than 10px",
    },
    {
      id: 1,
      name: "Underlined text",
      description: "Underlined text appears as a clickable link which can confuse users",
      wcagLinks: [
        {
          "name": "Underlining",
          "url": "https://design.canada.ca/style-guide/#wp4-2"
        }
      ],
      fix: "Remove underline from non-link text to prevent confusion",
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