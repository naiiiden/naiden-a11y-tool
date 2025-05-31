export const deprecatedElementsErrors = [
  {
    type: "deprecated-elements",
    id: 0,
    name: "<marquee> elements are deprecated and must not be used",
    description:
      "A <marquee> element is present",
    wcagLinks: [
      {
        name: "Pause, Stop, Hide (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide",
      },
      {
        name: "Failure of Success Criterion 2.2.2 due to including scrolling content where movement is not essential to the activity without also including a mechanism to pause and restart the content",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F16.html",
      },
    ],
    fix: "Remove the <marquee> element and replace it with CSS animations or other accessible methods. Ensure the user is allowed to pause or stop the animation.",
  },
];
