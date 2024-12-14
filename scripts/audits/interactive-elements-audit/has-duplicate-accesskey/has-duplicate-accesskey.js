import { interactiveElementsErrors } from "../../../errors/interactive-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasDuplicateAccesskeys(auditResults) {
    const hasDuplicateAccesskeys = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const elementsWithAccesskeys = Array.from(document.querySelectorAll("[accesskey]:not([accesskey=''])"));

        const duplicates = elementsWithAccesskeys.reduce((acc, element) => {
            const accesskey = element.getAttribute("accesskey").trim();
            if (!acc[accesskey]) {
                acc[accesskey] = [];
            }
            acc[accesskey].push(element);
            return acc;
        }, {});

        return Object.values(duplicates)
            .filter(elements => elements.length > 1)
            .map(elements => elements.map(element => ({
                selector: getUniqueSelector(element),
                outerHTML: element.cloneNode().outerHTML
            })));
    `);

    hasDuplicateAccesskeys.forEach(group => {
        const message = `Duplicate ID found on the following elements:\n` +
            group.map(d => `- Selector: ${d.selector}`).join("\n");

        auditResults.push({
            ...interactiveElementsErrors[6],
            message,
            elements: group.map(d => d.outerHTML),
        });
    });
}