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

    const ariaProgressbar = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='progressbar']"))
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

    ariaProgressbar.forEach(element => {
        auditResults.push({ ...ariaErrors[3], element: element.outerHTML, selector: element.selector });
    });

    const ariaTooltip = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='tooltip']:empty"))
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

    ariaTooltip.forEach(element => {
        auditResults.push({ ...ariaErrors[4], element: element.outerHTML, selector: element.selector });
    });

    const ariaDeprecatedRoles = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='directory']"))
        .map(element => ({
            outerHTML: element.outerHTML,
            selector: getUniqueSelector(element)
        }));
    `)

    ariaDeprecatedRoles.forEach(element => {
        auditResults.push({ ...ariaErrors[5], element: element.outerHTML, selector: element.selector });
    });

    const ariaInputFields = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='combobox'], [role='listbox'], [role='searchbox'], [role='slider'], [role='spinbutton'], [role='textbox']"))
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

    ariaInputFields.forEach(element => {
        auditResults.push({ ...ariaErrors[6], element: element.outerHTML, selector: element.selector });
    });

    const ariaHiddenFocusable = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[aria-hidden='true']:has(a, button, input:not(disabled))"))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `)

    ariaHiddenFocusable.forEach(element => {
        auditResults.push({ ...ariaErrors[8], element: element.outerHTML, selector: element.selector });
    })

    const ariaDialogAndAlertDialog = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='alert'], [role='alertdialog']"))
            .filter(element => {
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
    `)

    ariaDialogAndAlertDialog.forEach(element => {
        auditResults.push({ ...ariaErrors[11], element: element.outerHTML, selector: element.selector });
    });

    const ariaText = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='text']:has(a, button, :is(input, textarea, select):not(disabled), :not([tabindex^='-']))"))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `)

    ariaText.forEach(element => {
        auditResults.push({ ...ariaErrors[12], element: element.outerHTML, selector: element.selector });
    });
}