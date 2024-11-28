import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasPresentationOrNoneRoleConflict(auditResults) {
    const hasPresentationOrNoneRoleConflict = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};

        const selector = [
            ":is([role='none'], [role='presentation'])",
                ":is([tabindex]:not([tabindex^='-']))"
        ].join("");
        
        console.log(selector)

        return Array.from(document.querySelectorAll(selector))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `) 
    
    hasPresentationOrNoneRoleConflict.forEach(element => {
        auditResults.push({
            ...ariaErrors[22],
            element: element.outerHTML,
            selector: element.selector
        });
    });
}