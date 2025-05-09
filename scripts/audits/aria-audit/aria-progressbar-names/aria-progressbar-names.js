import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasAriaProgressbarNames() {
    return Array.from(document.querySelectorAll("[role='progressbar']"))
        .filter(element => {
            if (!isElementVisible(element)) {
                return false;
            }
    
            const ariaLabel = element.hasAttribute('aria-label') ? element.getAttribute('aria-label').trim() : null;
            const ariaLabelledby = element.hasAttribute('aria-labelledby') 
                ? document.getElementById(element.getAttribute('aria-labelledby')) 
                : null;
            const title = element.hasAttribute('title') ? element.getAttribute('title').trim() : null;
            
            return !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
        })
        .map(element => ({
            outerHTML: element.outerHTML,
            selector: getUniqueSelector(element)
        }));
}

export async function hasAriaProgressbarNamesEval(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-progressbar-name
    const ariaProgressbarNames = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasAriaProgressbarNames = ${hasAriaProgressbarNames.toString()};

        return hasAriaProgressbarNames();
    `)

    ariaProgressbarNames.forEach(element => {
        auditResults.push({ ...ariaErrors[3], element: element.outerHTML, selector: element.selector });
    });
}