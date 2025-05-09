export const ariaErrors = [
  {
    type: "ARIA",
    id: 0,
    name: "aria-hidden='true' must not be present on document body",
    description:
      "Document is not accessible to assistive technologies when the body element has aria-hidden='true'",
    wcagLinks: [
      {
        name: "aria-hidden state",
        url: "https://www.w3.org/TR/wai-aria-1.3/#aria-hidden",
      },
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
    fix: "Ensure the document body element doesn't have aria-hidden=true attribute",
  },
  {
    type: "ARIA",
    id: 1,
    name: "ARIA commands must have an accessible name",
    description:
      "ARIA commands must have an accessible name that describes the destination, purpose, function or action for screen readers",
    wcagLinks: [
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        name: "The title attribute",
        url: "https://html.spec.whatwg.org/#the-title-attribute",
      },
    ],
    fix: "Ensure elements with role=link, role=button or role=menuitem have an accessible name",
  },
  {
    type: "ARIA",
    id: 2,
    name: "ARIA meter elements must have an accessible name",
    description: "ARIA meter elements must have an accessible name",
    wcagLinks: [
      {
        name: "Non-text Content (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
      },
      {
        name: "Using aria-label to provide labels for objects",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6",
      },
      {
        name: "Using aria-labelledby to provide a name for user interface controls",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16",
      },
      {
        name: "The title attribute",
        url: "https://html.spec.whatwg.org/#the-title-attribute",
      },
    ],
    fix: "Ensure elements with role meter have accessible names",
  },
  {
    type: "ARIA",
    id: 3,
    name: "ARIA progressbar elements must have an accessible name",
    description: "ARIA progressbar elements must have an accessible name",
    wcagLinks: [
      {
        name: "Non-text Content (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
      },
      {
        name: "Using aria-label to provide labels for objects",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6",
      },
      {
        name: "Using aria-labelledby to provide a name for user interface controls",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16",
      },
      {
        name: "The title attribute",
        url: "https://html.spec.whatwg.org/#the-title-attribute",
      },
    ],
    fix: "Ensure elements with role progressbar have accessible names",
  },
  {
    type: "ARIA",
    id: 4,
    name: "ARIA tooltip elements must have an accessible name",
    description: "ARIA tooltip elements must have an accessible name",
    wcagLinks: [
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        name: "The title attribute",
        url: "https://html.spec.whatwg.org/#the-title-attribute",
      },
    ],
    fix: "Ensure elements with role tooltip have accessible names",
  },
  {
    type: "ARIA",
    id: 5,
    name: "Deprecated ARIA roles must not be used",
    description: "Deprecated ARIA roles must not be used",
    wcagLinks: [
      {
        name: "The roles model",
        url: "https://www.w3.org/TR/wai-aria-1.3/#roles",
      },
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
    fix: "Make sure all that all role attributes are not using deprecated values",
  },
  {
    type: "ARIA",
    id: 6,
    name: "ARIA input fields must have an accessible names",
    description: "ARIA input fields must have an accessible names",
    wcagLinks: [
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        name: "Using aria-label to provide labels for objects",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6",
      },
      {
        name: "Using aria-labelledby to provide a name for user interface controls",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16",
      },
      {
        name: "The title attribute",
        url: "https://html.spec.whatwg.org/#the-title-attribute",
      },
    ],
    fix: "Ensure elements with role (combobox, listbox, searchbox, slider, spinbutton, textbox) have accessible names",
  },
  {
    type: "ARIA",
    id: 7,
    name: "ARIA toggle field elements must have an accessible name",
    description: "ARIA toggle field elements must have an accessible name",
    wcagLinks: [
      {
        name: "Non-text Content (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
      },
      {
        name: "Using aria-label to provide labels for objects",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6",
      },
      {
        name: "Using aria-labelledby to provide a name for user interface controls",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16",
      },
      {
        name: "The title attribute",
        url: "https://html.spec.whatwg.org/#the-title-attribute",
      },
    ],
    fix: "Ensure elements with role (checkbox, menu, menuitemcheckbox, menuitemradio, radio, radiogroup, switch) have accessible names",
  },
  {
    type: "ARIA",
    id: 8,
    name: "ARIA hidden elements must not be focusable or contain focusable children",
    description:
      "ARIA hidden elements must not be focusable or contain focusable children",
    wcagLinks: [
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        name: "Info and Relationships (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
      },
      {
        name: "Element with aria-hidden has no content in sequential focus navigation",
        url: "https://www.w3.org/WAI/standards-guidelines/act/rules/6cfa84/",
      },
      {
        name: "Fourth Rule of ARIA Use",
        url: "https://www.w3.org/TR/using-aria/#4thrule",
      },
      {
        name: "aria-hidden state",
        url: "https://www.w3.org/TR/wai-aria-1.3/#aria-hidden",
      },
    ],
    fix: "Ensure ARIA hidden elements are not focusable and don't contain focusable children",
  },
  {
    type: "ARIA",
    id: 9,
    name: "ARIA roles must conform to valid values",
    description: "ARIA roles must conform to valid values",
    wcagLinks: [
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        name: "Info and Relationships (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
      },
      {
        name: "The roles model",
        url: "https://www.w3.org/TR/wai-aria-1.3/#roles",
      },
    ],
    fix: "Ensure all ARIA role elements have a valid value",
  },
  {
    type: "ARIA",
    id: 10,
    name: "ARIA dialog and alertdialog elements must have an accessible name",
    description: "ARIA dialog and alertdialog elements must have an accessible name",
    wcagLinks: [
      {
        name: "Using aria-alertdialog to identify errors",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA18",
      },
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
    fix: "Ensure elements with role dialog and alertdialog have accessible names",
  },
  {
    type: "ARIA",
    id: 11,
    name: "ARIA role text elements should not have focusable descendants",
    description: "ARIA role text elements should not have focusable descendants",
    wcagLinks: "",
    fix: "Ensure elements with role text don't have focusable descendants",
  },
  {
    type: "ARIA",
    id: 12,
    name: "ARIA role should be appropriate for the element",
    description: "ARIA role should be appropriate for the element",
    wcagLinks: [
      {
        name: "The roles model",
        url: "https://www.w3.org/TR/wai-aria-1.3/#roles",
      },
      {
        name: "Document conformance requirements for use of ARIA attributes in HTML",
        url: "https://www.w3.org/TR/html-aria/#docconformance",
      },
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        name: "Info and Relationships (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
      },
    ],
    fix: "Ensure elements with role attribute have appropriate value for the element",
  },
  {
    type: "ARIA",
    id: 13,
    name: "ARIA treeitem elements must have an accessible name",
    description: "ARIA treeitem elements must have an accessible name",
    wcagLinks: [
      {
        name: "Using aria-label to provide labels for objects",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA6",
      },
      {
        name: "aria-labelledby property",
        url: "https://www.w3.org/TR/wai-aria-1.3/#aria-labelledby",
      },
      {
        name: "The title attribute",
        url: "https://html.spec.whatwg.org/#the-title-attribute",
      },
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
    ],
    fix: "Ensure ARIA treeitem elements have accessible names",
  },
  {
    type: "ARIA",
    id: 14,
    name: "ARIA attributes must conform to valid values",
    description: "ARIA attributes must conform to valid values",
    wcagLinks: [
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        name: "6. Supported states and properties",
        url: "https://www.w3.org/TR/wai-aria-1.3/#states_and_properties",
      },
    ],
    fix: "Ensure all ARIA attributes have valid values",
  },
  {
    type: "ARIA",
    id: 15,
    name: "ARIA attributes must conform to valid names",
    description: "ARIA attributes must conform to valid names",
    wcagLinks: [
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        name: "6. Supported states and properties",
        url: "https://www.w3.org/TR/wai-aria-1.3/#states_and_properties",
      },
    ],
    fix: "Ensure all ARIA attributes have valid names",
  },
  {
    type: "ARIA",
    id: 16,
    name: "Elements with ARIA roles must only use supported ARIA attributes",
    description: "Elements with ARIA roles must only use supported ARIA attributes",
    wcagLinks: [
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        name: "Categorization of roles",
        url: "https://www.w3.org/TR/wai-aria-1.3/#roles_categorization",
      },
      {
        name: "Taxonomy of WAI-ARIA states and properties",
        url: "https://www.w3.org/TR/wai-aria-1.3/#state_prop_taxonomy",
      },
    ],
    fix: "Ensure element with ARIA roles use ARIA attributes allowed for their role",
  },
  {
    type: "ARIA",
    id: 17,
    name: "Required ARIA attributes must be provided for elements with ARIA role",
    description: "required ARIA attributes must be provided for elements with ARIA role",
    wcagLinks: [
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        name: "Definition of roles",
        url: "https://www.w3.org/TR/wai-aria-1.3/#role_definitions",
      },
    ],
    fix: "Ensure all elements with ARIA role have required attributes defined",
  },
  {
    type: "ARIA",
    id: 18,
    name: "Certain ARIA roles must contain particular children",
    description: "Certain ARIA roles must contain particular children",
    wcagLinks: [
      {
        name: "Info and Relationships (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
      },
      {
        name: "Definition of roles",
        url: "https://www.w3.org/TR/wai-aria-1.3/#role_definitions",
      },
    ],
    fix: "Ensure ARIA role elements have required children role",
  },
  {
    type: "ARIA",
    id: 19,
    name: "Certain ARIA roles must be contained by particular parents",
    description: "Certain ARIA roles must be contained by particular parents",
    wcagLinks: [
      {
        name: "Info and Relationships (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
      },
      {
        name: "Definition of roles",
        url: "https://www.w3.org/TR/wai-aria-1.3/#role_definitions",
      },
    ],
    fix: "Ensure ARIA role elements are contained by parent role",
  },
  {
    type: "ARIA",
    id: 20,
    name: "ARIA role elements must use permitted ARIA attributes",
    description: "ARIA role elements must use permitted ARIA attributes",
    wcagLinks: [
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        name: "Categorization of roles",
        url: "https://www.w3.org/TR/wai-aria-1.3/#roles_categorization",
      },
      {
        name: "Taxonomy of WAI-ARIA states and properties",
        url: "https://www.w3.org/TR/wai-aria-1.3/#state_prop_taxonomy",
      },
    ],
    fix: "Ensure ARIA attributes are not prohibited for the element's role",
  },
  {
    type: "ARIA",
    id: 21,
    name: "ARIA attributes must be used as specified for the element's role",
    description: "ARIA attributes must be used as specified for the element's role",
    wcagLinks: [
      {
        name: "Name, Role, Value (Level A)",
        url: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html",
      },
      {
        name: "Categorization of roles",
        url: "https://www.w3.org/TR/wai-aria-1.3/#roles_categorization",
      },
      {
        name: "Taxonomy of WAI-ARIA states and properties",
        url: "https://www.w3.org/TR/wai-aria-1.3/#state_prop_taxonomy",
      },
    ],
    fix: "Ensure ARIA attributes are not used in a way their role describes authors should not or must not do",
  },
  {
    type: "ARIA",
    id: 22,
    name: "Elements marked as presentational or none should be consistently ignored",
    description:
      "Elements marked as presentational or none should be consistently ignored",
    wcagLinks: "",
    fix: "Check all elements with role=none or role=presentation to ensure they do not have a global ARIA attribute and are not focusable",
  },
  {
    type: "ARIA",
    id: 23,
    name: "Elements must have their visible text as part of their accessible name",
    description: "Elements must have their visible text as part of their accessible name",
    wcagLinks: [
      {
        name: "Using label elements to associate text labels with form controls",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H44",
      },
      {
        name: "Using the title attribute to identify form controls when the label element cannot be used",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/html/H65",
      },
      {
        name: "Using aria-label to provide an invisible label where a visible label cannot be used",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA14",
      },
      {
        name: "Using aria-labelledby to provide a name for user interface controls",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16",
      },
      {
        name: "Label in name",
        url: "https://www.w3.org/TR/WCAG22/#label-in-name",
      },
      {
        name: "Failure of Success Criterion 4.1.2 due to a user interface control not having a programmatically determined name",
        url: "https://www.w3.org/WAI/WCAG22/Techniques/failures/F68",
      },
    ],
    fix: "Ensure interactive elements labeled through their content have their visible label as part of their accessible name",
  },
];
