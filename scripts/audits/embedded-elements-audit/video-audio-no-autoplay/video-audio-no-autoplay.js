import { embeddedElementsErrors } from "../../../errors/embedded-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function videOrAudioHasAutoplay(auditResults) {
    const videOrAudioHasAutoplay = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(":is(audio, video)[autoplay]:not([controls])"))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `) 
  
    videOrAudioHasAutoplay.forEach(element => {
        auditResults.push({ ...embeddedElementsErrors[3], element: element.outerHTML, selector: element.selector });
    });
}