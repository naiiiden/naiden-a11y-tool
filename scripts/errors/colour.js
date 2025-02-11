export const colourErrors = [
    {
      id: 0,
      name: "Elements must meet minimum color contrast ratio thresholds",
      description: "All text elements must have sufficient contrast between text in the foreground and background colors behind it in accordance with WCAG 2 AA contrast ratio thresholds.",
      wcagLinks: [
        {
          "name": "Contrast (Minimum) (Level AA)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html"
        }
      ],
      fix: "Ensure that the contrast between the foreground text and the background colors meet the WCAG 2 AA contrast ratio thresholds",
    }
]