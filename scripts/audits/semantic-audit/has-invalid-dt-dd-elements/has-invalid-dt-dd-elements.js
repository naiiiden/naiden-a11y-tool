import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasInvalidDtDdElements(auditResults) {
    const invalidDtDdElements = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('dt:not(dl dt), dd:not(dl dd)'))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `);
    
    invalidDtDdElements.forEach((element) => {
        auditResults.push({
            ...semanticErrors[17],
            element: element.outerHTML,
            selector: element.selector
        });
    });
}