import { formErrors } from "../../../errors/forms.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export function hasRelatedFormControlsMissingFieldset() {
  const elements = Array.from(
    document.querySelectorAll(
      'input[type="radio"]:not(fieldset input, [name=""], :not([name])), input[type="checkbox"]:not(fieldset input, [name=""], :not([name]))',
    ),
  );
  const groupedByName = elements.reduce((groups, input) => {
    if (!groups[input.name]) groups[input.name] = [];
    groups[input.name].push(input);
    return groups;
  }, {});

  return Object.values(groupedByName)
    .filter((group) => group.length > 1)
    .map((group) =>
      group.map((input) => ({
        outerHTML: input.outerHTML,
        selector: getUniqueSelector(input),
      })),
    );
}

export async function hasRelatedFormControlsMissingFieldsetEval(auditResults) {
  const relatedFormControlsMissingFieldset = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const hasRelatedFormControlsMissingFieldset = ${hasRelatedFormControlsMissingFieldset.toString()};

    return hasRelatedFormControlsMissingFieldset();
  `);

  relatedFormControlsMissingFieldset.forEach((group) => {
    group.forEach((input) => {
      auditResults.push({
        ...formErrors[4],
        element: input.outerHTML,
        selector: input.selector,
      });
    });
  });
}
