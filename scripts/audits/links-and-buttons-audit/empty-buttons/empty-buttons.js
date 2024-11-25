import { linksAndButtonsErrors } from "../../../errors/links-and-buttons.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasEmptyButtons(auditResults) {
    const emptyButtons = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('button:not(:has(img))'))
            .filter(button => {
                const ariaLabel = button.hasAttribute('aria-label') ? button.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = button.hasAttribute('aria-labelledby') 
                ? document.getElementById(button.getAttribute('aria-labelledby')) 
                : null;
                const title = button.hasAttribute('title') ? button.getAttribute('title').trim() : null;
                const tabIndex = button.hasAttribute('tabindex') ? button.getAttribute('tabindex').trim() === "-1" : null;

                return (button.innerText.trim() === "" || tabIndex) && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
            })
            .map(button => ({
                outerHTML: button.outerHTML,
                selector: getUniqueSelector(button)
            }));
    `);
    
    emptyButtons.forEach(button => {
        auditResults.push({ ...linksAndButtonsErrors[1], element: button.outerHTML, selector: button.selector });
    });
}