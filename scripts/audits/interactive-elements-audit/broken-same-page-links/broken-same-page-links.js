import { interactiveElementsErrors } from "../../../errors/interactive-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasBrokenSamePageLinks(auditResults) {
    const brokenSamePageLinks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('a[href^="#"]'))
            .filter(link => {
                const linkText = link.innerText.toLowerCase();
                return !(linkText.includes('jump') || linkText.includes('skip'));
            })
            .map(link => {
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                return {
                    targetExists: !!targetElement,
                    outerHTML: link.outerHTML,
                    selector: getUniqueSelector(link)
                };
            });
      `) 
      
    brokenSamePageLinks
        .filter(link => !link.targetExists)
        .forEach(link => {
            auditResults.push({
                ...interactiveElementsErrors[4],
                element: link.outerHTML,
                selector: link.selector
            });
        });
}