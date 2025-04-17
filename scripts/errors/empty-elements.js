export const emptyElementsErrors = [
    {
      type: "empty-elements",
      id: 0,
      name: "Empty heading",
      description: "A heading is empty.",
      wcagLinks: [
        {
          "name": "Headings and Labels (Level AA)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels"
        },
        {
          "name": "Providing descriptive headings",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/general/G130.html"
        }
      ],
      fix: "Add text to the empty heading.",
    },
    {
      type: "empty-elements",
      id: 1,
      name: "Empty table header",
      description: "Some table headers empty.",
      wcagLinks: "",
      fix: "Add text to the empty table header.",
    },
    {
      type: "empty-elements",
      id: 2,
      name: "Empty or missing summary",
      description: "Summary element is empty or missing.",
      wcagLinks: [
        {
          "name": "Name, Role, Value (Level A)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html"
        },
      ],
      fix: "Add summary.",
    },
]