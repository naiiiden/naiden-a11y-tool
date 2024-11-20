import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaTooltipNames(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-tooltip-name
    const ariaTooltipNames = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='tooltip']"))
            .filter(element => {
                const ariaLabel = element.hasAttribute('aria-label') ? element.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = element.hasAttribute('aria-labelledby') 
                    ? document.getElementById(element.getAttribute('aria-labelledby')) 
                    : null;
                const title = element.hasAttribute('title') ? element.getAttribute('title').trim() : null;
                
                return element.innerText.trim() === "" && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
            })
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `)

    ariaTooltipNames.forEach(element => {
        auditResults.push({ ...ariaErrors[4], element: element.outerHTML, selector: element.selector });
    });
}