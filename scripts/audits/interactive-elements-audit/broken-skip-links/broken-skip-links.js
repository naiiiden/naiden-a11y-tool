import { interactiveElementsErrors } from "../../../errors/interactive-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasBrokenSkipLinks() {
    return Array.from(document.querySelectorAll('a[href^="#"]'))
    .filter(link => 
        isElementVisible(link)
    )
    .map(link => {
        const linkText = link.textContent.toLowerCase();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
    
        return {
            linkText,
            targetExists: !!targetElement,
            linkOuterHTML: link.outerHTML,
            linkSelector: getUniqueSelector(link)
        };
    });
}

export async function hasBrokenSkipLinksEval(auditResults) {
    const brokenSkipLinks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasBrokenSkipLinks = ${hasBrokenSkipLinks.toString()};

        return hasBrokenSkipLinks();
    `) 
      
    brokenSkipLinks
    .filter(link => (link.linkText.includes('skip') || link.linkText.includes('jump')) && !link.targetExists)
    .forEach(link => {
        auditResults.push({
        ...interactiveElementsErrors[2],
        element: link.linkOuterHTML,
        selector: link.linkSelector
        });
    });
}