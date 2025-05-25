export const tableErrors = [
  {
    type: "colour",
    id: 0,
    name: "Elements must meet minimum color contrast ratio thresholds",
    description:
      "All text elements must have sufficient contrast between text in the foreground and background colors behind it in accordance with WCAG 2 AA contrast ratio thresholds.",
    wcagLinks: [
      {
        name: "Contrast (Minimum) (Level AA)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
      },
      {
        name: "Text is less than 18 point if not bold and less than 14 point if bold: Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text) and background behind the text",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G18",
      },
      {
        name: "Text is at least 18 point if not bold or at least 14 point if bold: Ensuring that a contrast ratio of at least 3:1 exists between text (and images of text) and background behind the text",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G145",
      },
    ],
    fix: "Ensure that the contrast between the foreground text and the background colors meet the WCAG 2 AA contrast ratio thresholds",
  },
];
