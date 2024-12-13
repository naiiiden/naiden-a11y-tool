import { embeddedElementsErrors } from "../../../errors/embedded-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasVideoCaptions(auditResults) {
    const hasVideoCaptions = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("video:not(:has(track[kind='captions']))"))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `) 
  
    hasVideoCaptions.forEach(element => {
        auditResults.push({ ...embeddedElementsErrors[4], element: element.outerHTML, selector: element.selector });
    });
}