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

    const ariaToggleFieldNames = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='checkbox'], [role='menu'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='radio'], [role='radiogroup'], [role='switch']"))
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

    ariaToggleFieldNames.forEach(element => {
        auditResults.push({ ...ariaErrors[7], element: element.outerHTML, selector: element.selector });
    });

    const ariaHiddenWithFocusableChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[aria-hidden='true']"))
            .filter(element => {
                return Array.from(element.querySelectorAll("a, :is(input, textarea, select, button):not(:disabled), [tabindex]:not([tabindex^='-'])")) 
                    .some(child => window.getComputedStyle(child).display !== 'none');
            })
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `);

    ariaHiddenWithFocusableChildren.forEach(element => {
        auditResults.push({ ...ariaErrors[8], element: element.outerHTML, selector: element.selector });
    })

    const ariaRoleValidValues = await inspectedWindowEval(`
        const validAriaRoles = new Set([
            "application", "article", "blockquote", "caption", "document", "feed", "group", "heading", "list", "listitem",
            "note", "paragraph", "separator", "toolbar", "code", "definition", "deletion", "emphasis", "figure", "img",
            "insertion", "mark", "math", "meter", "strong", "subscript", "superscript", "term", "time", "tooltip", 
            "banner", "complementary", "contentinfo", "form", "main", "navigation", "region", "search", "alert", "log",
            "marquee", "status", "timer", "none", "generic", "presentation", "cell", "columnheader", "row", "rowgroup",
            "rowheader", "table", "button", "checkbox", "gridcell", "link", "menuitem", "menuitemcheckbox", 
            "menuitemradio", "option", "progressbar", "radio", "scrollbar", "searchbox", "slider", 
            "spinbutton", "switch", "tab", "tabpanel", "textbox", "treeitem", "combobox", "grid", "listbox", "menu", 
            "menubar", "radiogroup", "tablist", "tree", "treegrid", "alertdialog", "dialog"
        ]);

        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role]"))
            .filter(element => !validAriaRoles.has(element.getAttribute("role").trim()))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element),
            }));
    `)

    ariaRoleValidValues.forEach(element => {
        auditResults.push({ ...ariaErrors[9], element: element.outerHTML, selector: element.selector });
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
        auditResults.push({ ...ariaErrors[10], element: element.outerHTML, selector: element.selector });
    });

    const ariaTextNoFocusableChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='text']:has(a, :is(input, textarea, select, button):not(:disabled), [tabindex]:not([tabindex^='-']))"))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `)

    ariaTextNoFocusableChildren.forEach(element => {
        auditResults.push({ ...ariaErrors[11], element: element.outerHTML, selector: element.selector });
    });

    const ariaAppropriateRole = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            a[href][role]:not([role='button'], [role='checkbox'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='option'], [role='radio'], [role='switch'], [role='tab'], [role='treeitem'], [role='link']), 
            a:not([href])[role]:is([role='generic']), 
            address[role]:is([role='group']), 
            area[href][role]:not([role='link']), 
            area:not([href])[role]:not([role='button'], [role='link']), 
            area:not([href])[role]:is([role='generic']), 
            article[role]:not([role='application'], [role='document'], [role='feed'], [role='main'], [role='none'], [role='presentation'], [role='region'], [role='article']), 
            aside[role]:not([role='feed'], [role='none'], [role='note'], [role='presentation'], [role='region'], [role='search'], [role='complementary']), 
            audio[role]:not([role='application']), 
            b[role]:is([role='generic']), 
            bdi[role]:is([role='generic']), 
            bdo[role]:is([role='generic']), 
            body[role]:is([role='generic']), 
            br[role]:not([role='none'], [role='presentation']), 
            button[role]:not([role='checkbox'], [role='combobox'], [role='gridcell'], [role='link'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='option'], [role='radio'], [role='separator'], [role='slider'], [role='switch'], [role='tab'], [role='treeitem'], [role='button']), 
            table caption[role]:not([role='caption']), 
            col[role]:not([role='']), 
            colgroup[role]:not([role='']), 
            data[role]:is([role='generic']), 
            datalist[role]:not([role='listbox']), 
            details[role]:not([role='group']), 
            dialog[role]:not([role='alertdialog'], [role='dialog']), 
            dfn[role]:not([role='term']), 
            div[role]:not(dl div):is([role='generic']), 
            dl > div[role]:not([role='presentation'], [role='none']), 
            dl[role]:not([role='group'], [role='list'], [role='none'], [role='presentation']), 
            dt[role]:not([role='listitem']), 
            embed[role]:not([role='application'], [role='document'], [role='img'], [role='none'], [role='presentation']), 
            fieldset[role]:not([role='none'], [role='presentation'], [role='radiogroup'], [role='group']), 
            figcaption[role]:not([role='group'], [role='none'], [role='presentation']), 
            footer[role]:not([role='group'], [role='presentation'], [role='none'], [role='contentinfo']), 
            footer[role]:is([role='generic']), 
            form[role]:not([role='none'], [role='presentation'], [role='search'], [role='form'])
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element),
            }));
    `)

    ariaAppropriateRole.forEach(element => {
        auditResults.push({ ...ariaErrors[12], element: element.outerHTML, selector: element.selector });
    });
}