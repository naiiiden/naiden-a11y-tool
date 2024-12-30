export const deprecatedElementsErrors = [
    {
      id: 0,
      name: "marquee elements are deprecated and must not be used",
      description: "marquee elements are deprecated and must not be used",
      wcagLinks: [
        {
          "name": "Pause, Stop, Hide (Level A)",
          "url": "https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide"
        },
        {
          "name": "Failure of Success Criterion 2.2.2 due to including scrolling content where movement is not essential to the activity without also including a mechanism to pause and restart the content",
          "url": "https://www.w3.org/WAI/WCAG21/Techniques/failures/F16.html"
        }
      ],
      fix: "ensure the marquee element is not used",
    }
]