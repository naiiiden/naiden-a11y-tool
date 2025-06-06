import { interactiveElementsErrors } from "../../../errors/interactive-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasDuplicateAccesskeys() {
  const elementsWithAccesskeys = Array.from(
    document.querySelectorAll("[accesskey]:not([accesskey=''])")
  );

  const duplicates = elementsWithAccesskeys
    .filter((element) => isElementVisible(element))
    .reduce((acc, element) => {
      const accesskey = element.getAttribute("accesskey").trim();
      if (!acc[accesskey]) {
        acc[accesskey] = [];
      }
      acc[accesskey].push(element);
      return acc;
    }, {});

  return Object.values(duplicates)
    .filter((elements) => elements.length > 1)
    .map((elements) =>
      elements.map((element) => ({
        selector: getUniqueSelector(element),
        outerHTML: element.cloneNode().outerHTML,
      }))
    );
}

export async function hasDuplicateAccesskeysEval(auditResults) {
  const duplicateAccesskeys = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasDuplicateAccesskeys = ${hasDuplicateAccesskeys.toString()};

    return hasDuplicateAccesskeys();
  `);

  duplicateAccesskeys.forEach((group) => {
    const helperText =
      `Duplicate ID found on the following elements:\n` +
      group.map((d) => `- Selector: ${d.selector}`).join("\n");

    auditResults.push({
      ...interactiveElementsErrors[6],
      helperText,
      elements: group.map((d) => d.outerHTML),
    });
  });
}
