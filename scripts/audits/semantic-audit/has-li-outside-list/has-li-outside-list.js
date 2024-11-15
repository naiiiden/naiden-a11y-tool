import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasLiOutsideList(auditResults) {
    const liOutsideList = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('li:not(ul li, ol li)'))
        .map(li => ({
            outerHTML: li.outerHTML,
            selector: getUniqueSelector(li)
        }));
    `) 
    
    liOutsideList.forEach((element) => {
        auditResults.push({
            ...semanticErrors[15],
            element: element.outerHTML,
            selector: element.selector
        });
    });
}