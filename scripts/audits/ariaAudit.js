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
}