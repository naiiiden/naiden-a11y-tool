import { linksAndButtonsErrors } from "../../../errors/links-and-buttons.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasEmptyLinks(auditResults) {
    const emptyLinks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('a:not(:has(img))'))
            .filter(link => {
                const ariaLabel = link.hasAttribute('aria-label') ? link.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = link.hasAttribute('aria-labelledby') 
                ? document.getElementById(link.getAttribute('aria-labelledby')) 
                : null;
                const title = link.hasAttribute('title') ? link.getAttribute('title').trim() : null;
        
                return link.innerText.trim() === "" && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
            })
            .map(link => ({
                outerHTML: link.outerHTML,
                selector: getUniqueSelector(link)
            }));
    `) 
  
    emptyLinks.forEach(link => {
        auditResults.push({ ...linksAndButtonsErrors[0], element: link.outerHTML, selector: link.selector });
    });
}