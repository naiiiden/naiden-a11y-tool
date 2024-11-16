import { emptyErrors } from "../../../errors/empty-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasEmptyHeadings(auditResults) {
    const emptyHeadings = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(":is(h1, h2, h3, h4, h5, h6, [role='heading']):not(:has(img)):empty"))
            .filter(heading => {
                const ariaLabel = heading.hasAttribute('aria-label') ? heading.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = heading.hasAttribute('aria-labelledby') 
                    ? document.getElementById(heading.getAttribute('aria-labelledby')) 
                    : null;
                
                return !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()));
            })
            .map(heading => ({
                outerHTML: heading.outerHTML,
                selector: getUniqueSelector(heading)
            }));
    `) 
  
    emptyHeadings.forEach(heading => {
        auditResults.push({ ...emptyErrors[0], element: heading.outerHTML, selector: heading.selector });
    });
}