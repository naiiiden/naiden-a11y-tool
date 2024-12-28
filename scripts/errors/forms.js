export const formErrors = [
    {
      id: 0,
      name: "Empty form label",
      description: "Form label is empty",
      wcagLinks: [
        {
          "name": "Using label elements to associate text labels with form controls",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H44"
        },
        {
          "name": "Using the title attribute to identify form controls when the label element cannot be used",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H65"
        },
        {
          "name": "Using aria-label to provide an invisible label where a visible label cannot be used",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA14"
        },
        {
          "name": "Using aria-labelledby to provide a name for user interface controls",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16"
        },
      ],
      fix: "Add text to the empty form label",
    },
    {
      id: 1,
      name: "Form control missing label",
      description: "Form control doesn't have a label",
      wcagLinks: [
        {
          "name": "Using label elements to associate text labels with form controls",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H44"
        },
        {
          "name": "Using the title attribute to identify form controls when the label element cannot be used",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H65"
        },
        {
          "name": "Using aria-label to provide an invisible label where a visible label cannot be used",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA14"
        },
        {
          "name": "Using aria-labelledby to provide a name for user interface controls",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16"
        },
      ],      
      fix: "Add a label for the form control",
    },
    {
      id: 2,
      name: "Form control multiple form labels",
      description: "Form control has more than 1 label",
      wcagLinks: "",
      fix: "Leave only one label for the form control",
    },
    {
      id: 3,
      name: "Fieldset doesn't have legend",
      description: "Legend describes the elements contained by a fieldset",
      wcagLinks: [
        {
          "name": "Providing a description for groups of form controls using fieldset and legend elements",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H71"
        }
      ],
      fix: "Add legend",
    },
    {
      id: 4,
      name: "Missing fieldset",
      description: "Two or more radio buttons or checkboxes with the same name are not contained by a fieldset",
      wcagLinks: [
        {
          "name": "Providing a description for groups of form controls using fieldset and legend elements",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H71"
        }
      ],
      fix: "Add fieldset",
    },
    {
      id: 5,
      name: "Empty submit or button input value",
      description: "Submit or button input value is empty",
      wcagLinks: [
        {
          "name": "Using the title attribute to identify form controls when the label element cannot be used",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H65"
        },
        {
          "name": "Using aria-label to provide an invisible label where a visible label cannot be used",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA14"
        },
        {
          "name": "Using aria-labelledby to provide a name for user interface controls",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16"
        },
      ],
      fix: "Add text to value",
    },
    {
      id: 6,
      name: "Image input must have alt text",
      description: "Image input must have alt text",
      wcagLinks: [
        {
          "name": "Using alt attributes on images used as submit buttons",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H36"
        }
      ],
      fix: "Add alt text to image inputs",
    },
    {
      id: 7,
      name: "Form elements should have a visible label",
      description: "Form elements should have a visible label",
      wcagLinks: [
        {
          "name": "Using label elements to associate text labels with form controls",
          "url": "https://www.w3.org/WAI/WCAG22/Techniques/html/H44"
        }
      ],
      fix: "Ensures that every input that requires a label is has a label other than the title or aria-describedby attributes",
    },
    {
      id: 8,
      name: "autocomplete attribute must be used correctly",
      description: "autocomplete attribute must be used correctly",
      wcagLinks: [
        {
          "name": "Identify Input Purpose (Level AA)",
          "url": "https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose"
        }
      ],
      fix: "Confirm that the autocomplete attribute is set with the appropriate value",
    },
]