import { interactiveElementsErrors } from "../../../errors/interactive-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasBrokenSkipLinks(auditResults) {
    const brokenSkipLinks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('a[href^="#"]')).map(link => {
            const linkText = link.innerText.toLowerCase();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const isHidden = window.getComputedStyle(link).display === "none" || window.getComputedStyle(link).visibility === "hidden";
          
            return {
                linkText,
                targetExists: !!targetElement,
                isHidden,
                linkOuterHTML: link.outerHTML,
                linkSelector: getUniqueSelector(link)
            };
        });
    `) 
      
    brokenSkipLinks
    .filter(link => (link.linkText.includes('skip') || link.linkText.includes('jump')) && (!link.targetExists || link.isHidden))
    .forEach(link => {
        auditResults.push({
        ...interactiveElementsErrors[2],
        element: link.linkOuterHTML,
        selector: link.linkSelector
        });
    });
}