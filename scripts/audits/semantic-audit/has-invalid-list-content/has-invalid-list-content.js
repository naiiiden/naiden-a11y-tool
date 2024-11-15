import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasInvalidListContent(auditResults) {
    const invalidListContent = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(':is(ul, ol) > :not(li):not(script):not(template)'))
        .map(element => ({
            outerHTML: element.outerHTML,
            selector: getUniqueSelector(element)
        }));
    `);
    
    invalidListContent.forEach((element) => {
        auditResults.push({
            ...semanticErrors[14],
            element: element.outerHTML,
            selector: element.selector
        });
    });
}