import { emptyErrors } from "../../../errors/empty-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasEmptyOrMissingSummaries(auditResults) {
    const emptyOrMissingSummaries = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("details"))
            .filter(details => {
                const summary = details.querySelector("summary");
        
                if (summary) {
                    const ariaLabel = summary.hasAttribute('aria-label') ? summary.getAttribute('aria-label').trim() : null;
                    const ariaLabelledby = summary.hasAttribute('aria-labelledby') 
                        ? document.getElementById(summary.getAttribute('aria-labelledby')) 
                        : null;
                    const title = summary.hasAttribute('title') ? summary.getAttribute('title').trim() : null;
            
                    return summary.innerText.trim() === "" && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
                }
        
                return !summary;
            })
          .map(details => ({
                outerHTML: details.outerHTML,
                selector: getUniqueSelector(details),
                summaryExists: !!details.querySelector("summary")
          }));
    `);
      
    emptyOrMissingSummaries.forEach(summary => {
        auditResults.push({ ...emptyErrors[2], element: summary.outerHTML, selector: summary.selector });
    });
}