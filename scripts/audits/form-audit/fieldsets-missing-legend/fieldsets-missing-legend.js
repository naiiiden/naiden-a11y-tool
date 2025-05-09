import { formErrors } from "../../../errors/forms.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasFieldsetsMissingLegend() {
  return Array.from(document.querySelectorAll("fieldset:not(:has(legend))"))
    .filter((fieldset) => isElementVisible(fieldset))
    .map((fieldset) => ({
      outerHTML: fieldset.outerHTML,
      selector: getUniqueSelector(fieldset),
    }));
}

export async function hasFieldsetsMissingLegendEval(auditResults) {
  const fieldsetsMissingLegends = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasFieldsetsMissingLegend = ${hasFieldsetsMissingLegend.toString()};

        return hasFieldsetsMissingLegend();
    `);

  fieldsetsMissingLegends.forEach((fieldset) => {
    auditResults.push({
      ...formErrors[3],
      element: fieldset.outerHTML,
      selector: fieldset.selector,
    });
  });
}
