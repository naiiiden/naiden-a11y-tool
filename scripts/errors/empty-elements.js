export const emptyErrors = [
    {
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
          "url": "https://www.w3.org/WAI/WCAG21/Techniques/general/G130.html"
        }
      ],
      fix: "Add text to the empty heading.",
    },
    {
      id: 1,
      name: "Empty table header",
      description: "Some table headers empty.",
      wcagLinks: "",
      fix: "Add text to the empty table header.",
    },
    {
      id: 2,
      name: "Empty or missing iframe title",
      description: "Some iframes have an empty or missing title.",
      wcagLinks: [
        {
          "name": "Using the title attribute of the iframe element",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H64"
        }
      ],
      fix: "Add text to the empty iframe.",
    },
    {
      id: 3,
      name: "Empty or missing summary",
      description: "Summary element is empty or missing.",
      wcagLinks: "",
      fix: "Add summary.",
    },
]