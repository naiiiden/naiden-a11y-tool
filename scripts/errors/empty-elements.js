export const emptyElementsErrors = [
  {
    type: "empty-elements",
    id: 0,
    name: "Empty heading",
    description: "Heading element is missing content.",
    wcagLinks: [
      {
        name: "Headings and Labels (Level AA)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels",
      },
      {
        name: "Providing descriptive headings",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G130.html",
      },
    ],
    fix: "Ensure that heading elements contain content.",
  },
  {
    type: "empty-elements",
    id: 1,
    name: "Empty table header",
    description: "Table header element is missing content.",
    wcagLinks: "",
    fix: "Ensure that table header elements contain text that describes the purpose of the row or the column.",
  },
  {
    type: "empty-elements",
    id: 2,
    name: "Empty or missing summary",
    description: "Summary element is empty or missing.",
    wcagLinks: [
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
    fix: "Ensure that summary elements have an accesible name.",
  },
];
