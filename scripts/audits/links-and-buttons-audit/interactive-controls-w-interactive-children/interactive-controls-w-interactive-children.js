import { linksAndButtonsErrors } from "../../../errors/links-and-buttons.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasInteractiveControlsWithInteractiveControlsAsChildren(auditResults) {
    const interactiveControlsWithInteractiveControlsAsChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(':is(button, a, [role="button"], [role="link"], [tabindex]:not([tabindex^="-"])):has(a, button, [role="button"], [role="link"], input, [tabindex]:not([tabindex^="-"]), textarea, select)'))
            .map(element => {
                return {
                    outerHTML: element.outerHTML,
                    selector: getUniqueSelector(element)
                };
            });
    `) 
      
    interactiveControlsWithInteractiveControlsAsChildren.forEach((element) => {
        auditResults.push({
            ...linksAndButtonsErrors[3],
            element: element.outerHTML,
            selector: element.selector
        });
    });
}