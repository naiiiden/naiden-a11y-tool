import { interactiveElementsErrors } from "../../../errors/interactive-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasInteractiveControlsWithInteractiveControlsAsChildren(auditResults) {
    const interactiveControlsWithInteractiveControlsAsChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`:is(button:not(:disabled), 
                                                         a[href], 
                                                         :is([role='button'], [role='link'])[tabindex]:not([tabindex^='-'], [tabindex='']), 
                                                         [contenteditable]:not([contenteditable='false']), 
                                                         [tabindex]:not([tabindex^="-"], [tabindex=''])):has(
                                                                                                            :is(
                                                                                                                a[href], 
                                                                                                                :is([role='button'], [role='link'])[tabindex]:not([tabindex^='-'], [tabindex='']), 
                                                                                                                [contenteditable]:not([contenteditable='false']), 
                                                                                                                [tabindex]:not([tabindex^="-"], [tabindex='']), 
                                                                                                                :is(input:not([type='hidden']), textarea, select, button):not(:disabled), 
                                                                                                                summary:not([tabindex^="-"], [tabindex='']), 
                                                                                                                :is(audio, video)[controls],
                                                                                                                embed,
                                                                                                                area[href]:is(map[name]:not([name='']) area
                                                                                                            )):not([tabindex='-1'])
                                                                                                        )\`))
            .map(element => {
                return {
                    outerHTML: element.outerHTML,
                    selector: getUniqueSelector(element)
                };
            });
    `) 
      
    interactiveControlsWithInteractiveControlsAsChildren.forEach((element) => {
        auditResults.push({
            ...interactiveElementsErrors[3],
            element: element.outerHTML,
            selector: element.selector
        });
    });
}