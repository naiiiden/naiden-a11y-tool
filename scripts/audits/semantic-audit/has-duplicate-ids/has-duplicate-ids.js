import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export function hasDuplicateIds() {
  const elementsWithIds = Array.from(document.querySelectorAll("[id]:not([id=''])"));

  const duplicates = elementsWithIds.reduce((acc, element) => {
    const id = element.id.trim();
    if (!acc[id]) {
      acc[id] = [];
    }
    acc[id].push(element);
    return acc;
  }, {});

  return Object.values(duplicates)
    .filter((elements) => elements.length > 1)
    .map((elements) =>
      elements.map((element) => ({
        selector: getUniqueSelector(element),
        outerHTML: element.cloneNode().outerHTML,
      })),
    );
}

export async function hasDuplicateIdsEval(auditResults) {
  const duplicateIds = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const hasDuplicateIds = ${hasDuplicateIds.toString()};

        return hasDuplicateIds();
    `);

  duplicateIds.forEach((group) => {
    const helperText =
      `Duplicate ID found on the following elements:\n` +
      group.map((d) => `- Selector: ${d.selector}`).join("\n");

    auditResults.push({
      ...semanticErrors[19],
      helperText,
      elements: group.map((d) => d.outerHTML),
    });
  });
}
