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
      fix: "Remove underline (element with text-decoration: underline style or <u> element) from non-link text to prevent confusion",
    },
    {
      id: 2,
      name: "Text properties unadjustable with custom stylesheets",
      description: "Text properties (line-height, letter-spacing, word-spacing, font-size) cannot be modified with custom stylesheets",
      wcagLinks: [
        {
          "name": "Text Spacing (Level AA)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html"
        }
      ],
      fix: "Ensure users can override text properties with custom stylesheets",
    },
]