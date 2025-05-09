import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export function hasAriaHiddenBody() {
    const body = document.body;
    const isHidden = body.hasAttribute('aria-hidden') && body.getAttribute('aria-hidden') === 'true';
    
    return {
        isHidden,
        outerHTML: body.cloneNode().outerHTML,
        selector: getUniqueSelector(body)
    }
}

export async function hasAriaHiddenBodyEval(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-hidden-body
    const documentBody = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const hasAriaHiddenBody = ${hasAriaHiddenBody.toString()};

        return hasAriaHiddenBody();
    `)

    if (documentBody.isHidden) {
        auditResults.push({ ...ariaErrors[0], element: documentBody.outerHTML, selector: documentBody.selector });
    }
}