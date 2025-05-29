export const embeddedElementsErrors = [
  {
    type: "embedded-elements",
    id: 0,
    name: "Empty or missing iframe title",
    description: "Iframe has an empty or missing title.",
    wcagLinks: [
      {
        name: "Using the title attribute of the iframe element",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H64",
      },
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
    fix: "Ensure every iframe element has an accessible name.",
  },
  {
    type: "embedded-elements",
    id: 1,
    name: "Object elements must have alt text",
    description: "Object element is missing alt text",
    wcagLinks: [
      {
        name: "Using the body of the object element",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H53",
      },
      {
        name: "Non-text Content (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
      },
    ],
    fix: "Ensures every object element has alt text",
  },
  {
    type: "embedded-elements",
    id: 2,
    name: "Iframe elements must have a unique title attribute",
    description: "Iframe element has a non-unique title attribute",
    wcagLinks: [
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        name: "Using the title attribute of the iframe element",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H64",
      },
    ],
    fix: "Ensure all iframe elements contain a unique and non-empty title attribute",
  },
  {
    type: "embedded-elements",
    id: 3,
    name: "Video or audio elements must not autoplay",
    description:
      "A video or audio element autoplays audio for more than 3 seconds without a control mechanism to stop or mute the audio",
    wcagLinks: [
      {
        name: "Audio Control (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/audio-control",
      },
      {
        name: "Playing a sound that turns off automatically within three seconds",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G60",
      },
      {
        name: "Providing a control near the beginning of the Web page that turns off sounds that play automatically",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G170",
      },
      {
        name: "Playing sounds only on user request",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G171",
      },
    ],
    fix: "Ensure all video or audio elements do not autoplay",
  },
  {
    type: "embedded-elements",
    id: 4,
    name: "Video elements must have captions",
    description:
      "Video element lacks must have captions which should convey all meaningful auditory information in the video including dialogue, musical cues, sound effects, and other relevant information for deaf users",
    wcagLinks: [
      {
        name: "Providing closed captions",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G87.html",
      },
      {
        name: "Providing open (always visible) captions",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/general/G93.html",
      },
      {
        name: "Using the track element to provide captions",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H95",
      },
      {
        name: "Captions (Prerecorded) (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html",
      },
    ],
    fix: "Ensure video elements have captions",
  },
];
