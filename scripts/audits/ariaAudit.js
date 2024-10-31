import { ariaErrors } from "../errors/aria.js";
import { getUniqueSelector, inspectedWindowEval } from "../utils.js";

export async function ariaAudit(auditResults) {
    const documentBody = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const body = document.body;
        const isAriaHidden = body.hasAttribute('aria-hidden') && body.getAttribute('aria-hidden') === 'true';
        
        return {
            isAriaHidden,
            outerHTML: body.outerHTML,
            selector: getUniqueSelector(body)
        }
    `)

    if (documentBody.isAriaHidden) {
        auditResults.push({ ...ariaErrors[0], element: documentBody.outerHTML, selector: documentBody.selector });
    }

    const ariaCommands = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(":is([role='link'], [role='button'], [role='menuitem']):empty"))
            .filter(element => {
                const ariaLabel = element.hasAttribute('aria-label') ? element.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = element.hasAttribute('aria-labelledby') 
                ? document.getElementById(element.getAttribute('aria-labelledby')) 
                : null;
                
                return !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()));
            })
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `)

    ariaCommands.forEach(element => {
        auditResults.push({ ...ariaErrors[1], element: element.outerHTML, selector: element.selector });
    });

    const ariaMeter = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='meter']"))
            .filter(element => {
                const ariaLabel = element.hasAttribute('aria-label') ? element.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = element.hasAttribute('aria-labelledby') 
                ? document.getElementById(element.getAttribute('aria-labelledby')) 
                : null;
                
                return !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()));
            })
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `)

    ariaMeter.forEach(element => {
        auditResults.push({ ...ariaErrors[2], element: element.outerHTML, selector: element.selector });
    });
}