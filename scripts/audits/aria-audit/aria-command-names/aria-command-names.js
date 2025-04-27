import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function ariaCommandsNames(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-command-name
    const ariaCommandsNames = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};

        return Array.from(document.querySelectorAll(":is([role='link'], [role='button'], [role='menuitem'])"))
            .filter(element => {
                if (!isElementVisible(element)) {
                    return false;
                }

                const ariaLabel = element.hasAttribute('aria-label') ? element.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = element.hasAttribute('aria-labelledby') 
                    ? document.getElementById(element.getAttribute('aria-labelledby')) 
                    : null;
                const title = element.hasAttribute('title') ? element.getAttribute('title').trim() : null;
                
                return element.textContent.trim() === "" && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
            })
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `)

    ariaCommandsNames.forEach(element => {
        auditResults.push({ ...ariaErrors[1], element: element.outerHTML, selector: element.selector });
    });
}