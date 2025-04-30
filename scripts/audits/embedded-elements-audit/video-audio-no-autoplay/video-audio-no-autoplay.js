import { embeddedElementsErrors } from "../../../errors/embedded-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function videOrAudioHasAutoplay(auditResults) {
    const videOrAudioHasAutoplay = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};

        return Array.from(document.querySelectorAll(":is(audio, video)[autoplay]:not([controls])"))
            .filter(element => isElementVisible(element))
            .filter(element => {
                return (element.duration || 0) > 3;    
            })
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `) 
  
    videOrAudioHasAutoplay.forEach(element => {
        auditResults.push({ ...embeddedElementsErrors[3], element: element.outerHTML, selector: element.selector });
    });
}