export const tableErrors = [
  {
    type: "table",
    id: 0,
    name: "scope attribute should be used correctly",
    description:
      "scope attribute should only be used on th elements",
    wcagLinks: [
      {
        name: "",
        url: "",
      },
    ],
    fix: "Check that the scope attribute is only being used on th elements. The value must be either row or col",
  },
  {
    type: "table",
    id: 1,
    name: "Tables should not have the same summary and caption",
    description:
      "Data tables that have both a summary and caption should not have the same text",
    wcagLinks: [
      {
        name: "",
        url: "",
      },
    ],
    fix: "Ensure that the content of the summary attribute and the <caption> elements are not identical",
  },
];
// https://dequeuniversity.com/rules/axe/4.10/td-headers-attr
// https://dequeuniversity.com/rules/axe/4.10/th-has-data-cells
// https://dequeuniversity.com/rules/axe/4.10/table-fake-caption
// https://dequeuniversity.com/rules/axe/4.10/td-has-header