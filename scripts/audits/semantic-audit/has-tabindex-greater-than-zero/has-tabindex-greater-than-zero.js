import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasTabindexGreaterThanZero(auditResults) {
    const hasTabindexGreaterThanZero = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[tabindex]:not([tabindex='0'], [tabindex^='-'])"))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `) 
    
    hasTabindexGreaterThanZero.forEach(element => {
        auditResults.push({
            ...semanticErrors[20],
            element: element.outerHTML,
            selector: element.selector
        });
    });
}