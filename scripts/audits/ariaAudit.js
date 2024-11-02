import { ariaErrors } from "../errors/aria.js";
import { getUniqueSelector, inspectedWindowEval } from "../utils.js";

export async function ariaAudit(auditResults) {
    const documentBodyAriaHidden = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const body = document.body;
        const isHidden = body.hasAttribute('aria-hidden') && body.getAttribute('aria-hidden') === 'true';
        
        return {
            isHidden,
            outerHTML: body.outerHTML,
            selector: getUniqueSelector(body)
        }
    `)

    if (documentBodyAriaHidden.isHidden) {
        auditResults.push({ ...ariaErrors[0], element: documentBody.outerHTML, selector: documentBody.selector });
    }

    const ariaCommandsNames = await inspectedWindowEval(`
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

    ariaCommandsNames.forEach(element => {
        auditResults.push({ ...ariaErrors[1], element: element.outerHTML, selector: element.selector });
    });

    const ariaMeterNames = await inspectedWindowEval(`
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

    ariaMeterNames.forEach(element => {
        auditResults.push({ ...ariaErrors[2], element: element.outerHTML, selector: element.selector });
    });

    const ariaProgressbarNames = await inspectedWindowEval(`
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

    ariaProgressbarNames.forEach(element => {
        auditResults.push({ ...ariaErrors[3], element: element.outerHTML, selector: element.selector });
    });

    const ariaTooltipNames = await inspectedWindowEval(`
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

    ariaTooltipNames.forEach(element => {
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

    const ariaInputFieldNames = await inspectedWindowEval(`
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

    ariaInputFieldNames.forEach(element => {
        auditResults.push({ ...ariaErrors[6], element: element.outerHTML, selector: element.selector });
    });

    const ariaHiddenWithFocusableChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[aria-hidden='true']"))
            .filter(element => {
                return Array.from(element.querySelectorAll("a, button, :is(input, textarea, select):not(disabled), :not([tabindex^='-'])")) 
                    .every(child => window.getComputedStyle(child).display !== 'none');
            })
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `);

    ariaHiddenWithFocusableChildren.forEach(element => {
        auditResults.push({ ...ariaErrors[8], element: element.outerHTML, selector: element.selector });
    })

    const ariaDialogAndAlertDialogNames = await inspectedWindowEval(`
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

    ariaDialogAndAlertDialogNames.forEach(element => {
        auditResults.push({ ...ariaErrors[11], element: element.outerHTML, selector: element.selector });
    });

    const ariaTextNoFocusableChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='text']:has(a, button, :is(input, textarea, select):not(disabled), :not([tabindex^='-']))"))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `)

    ariaTextNoFocusableChildren.forEach(element => {
        auditResults.push({ ...ariaErrors[12], element: element.outerHTML, selector: element.selector });
    });
}