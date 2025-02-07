import { embeddedElementsErrors } from "../../../errors/embedded-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasEmptyIframeTitles(auditResults) {
    const iframeTitles = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("iframe"))
            .filter(iframe => !iframe.hasAttribute("title") || iframe.getAttribute("title").trim() === "")
            .map(iframe => 
                ({ outerHTML: iframe.outerHTML, selector: getUniqueSelector(iframe) 
            }));
    `) 
  
    iframeTitles.forEach(iframe => {
        auditResults.push({ ...embeddedElementsErrors[0], element: iframe.outerHTML, selector: iframe.selector });
    });
}