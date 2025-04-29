import { interactiveElementsErrors } from "../../../errors/interactive-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function hasBrokenSamePageLinks(auditResults) {
    const brokenSamePageLinks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        
        return Array.from(document.querySelectorAll('a[href^="#"]'))
            .filter(link => {
                if (!isElementVisible(link)) {
                    return false;
                }

                const linkText = link.textContent.toLowerCase();
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