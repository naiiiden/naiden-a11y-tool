import { emptyElementsErrors } from "../../../errors/empty-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasEmptyOrMissingSummaries() {
    return Array.from(document.querySelectorAll("details"))
        .filter(details => {
            if (!isElementVisible(details)) {
                return false;
            }
            const summary = details.querySelector("summary");
    
            if (summary) {
                const ariaLabel = summary.hasAttribute('aria-label') ? summary.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = summary.hasAttribute('aria-labelledby') 
                    ? document.getElementById(summary.getAttribute('aria-labelledby')) 
                    : null;
                const title = summary.hasAttribute('title') ? summary.getAttribute('title').trim() : null;
        
                return summary.textContent.trim() === "" && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
            }
    
            return !summary;
        })
      .map(details => ({
            outerHTML: details.outerHTML,
            selector: getUniqueSelector(details),
            summaryExists: !!details.querySelector("summary")
      }));
}

export async function hasEmptyOrMissingSummariesEval(auditResults) {
    const emptyOrMissingSummaries = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasEmptyOrMissingSummaries = ${hasEmptyOrMissingSummaries.toString()};

        return hasEmptyOrMissingSummaries();
    `);
      
    emptyOrMissingSummaries.forEach(summary => {
        auditResults.push({ ...emptyElementsErrors[2], element: summary.outerHTML, selector: summary.selector });
    });
}