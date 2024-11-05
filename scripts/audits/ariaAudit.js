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
            a[href][role]:not([role=''], [role='button'], [role='checkbox'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='option'], [role='radio'], [role='switch'], [role='tab'], [role='treeitem'], [role='link']), 
            a:not([href])[role]:is([role='generic']), 
            address[role]:is([role='group']), 
            area[href][role]:not([role=''], [role='link']), 
            area:not([href])[role]:not([role=''], [role='button'], [role='link']), 
            area:not([href])[role]:is([role='generic']), 
            article[role]:not([role=''], [role='application'], [role='document'], [role='feed'], [role='main'], [role='none'], [role='presentation'], [role='region'], [role='article']), 
            aside[role]:not([role=''], [role='feed'], [role='none'], [role='note'], [role='presentation'], [role='region'], [role='search'], [role='complementary']), 
            audio[role]:not([role=''], [role='application']), 
            b[role]:is([role='generic']), 
            base[role]:not([role='']), 
            bdi[role]:is([role='generic']), 
            bdo[role]:is([role='generic']), 
            body[role]:is([role]:not([role='']), [role='generic']), 
            br[role]:not([role=''], [role='none'], [role='presentation']), 
            button[role]:not([role=''], [role='checkbox'], [role='combobox'], [role='gridcell'], [role='link'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='option'], [role='radio'], [role='separator'], [role='slider'], [role='switch'], [role='tab'], [role='treeitem'], [role='button']), 
            caption:is(table caption)[role]:not([role=''], [role='caption']), 
            col[role]:not([role='']), 
            colgroup[role]:not([role='']), 
            data[role]:is([role='generic']), 
            datalist[role]:not([role=''], [role='listbox']), 
            dd[role]:not([role='']), 
            details[role]:not([role=''], [role='group']), 
            dialog[role]:not([role=''], [role='alertdialog'], [role='dialog']), 
            div[role]:not(dl div):is([role='generic']), 
            dl > div[role]:not([role=''], [role='presentation'], [role='none']), 
            dl[role]:not([role=''], [role='group'], [role='list'], [role='none'], [role='presentation']), 
            dt[role]:not([role=''], [role='listitem']), 
            embed[role]:not([role=''], [role='application'], [role='document'], [role='img'], [role='none'], [role='presentation']), 
            fieldset[role]:not([role=''], [role='none'], [role='presentation'], [role='radiogroup'], [role='group']), 
            figcaption[role]:not([role=''], [role='group'], [role='none'], [role='presentation']), 
            footer[role]:not([role=''], [role='group'], [role='presentation'], [role='none'], [role='contentinfo']), 
            footer[role]:is([role='generic']), 
            form[role]:not([role=''], [role='none'], [role='presentation'], [role='search'], [role='form']), 
            :is(h1, h2, h3, h4, h5, h6)[role]:not([role=''], [role='none'], [role='presentation'], [role='tab'], [role='heading']), 
            head[role], 
            header[role]:not([role=''], [role='group'], [role='none'], [role='presentation'], [role='banner']), 
            header[role]:is([role='generic']), 
            hgroup[role]:is([role='group']), 
            hr[role]:not([role=''], [role='none'], [role='presentation'], [role='separator']), 
            html[role]:not([role=''], [role='document']),
            i[role]:is([role='generic']), 
            iframe[role]:not([role=''], [role='application'], [role='document'], [role='img'], [role='none'], [role='presentation']), 
            img[alt]:not([alt=''])[role]:not([role=''], [role='button'], [role='checkbox'], [role='link'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='meter'], [role='option'], [role='progressbar'], [role='radio'], [role='scrollbar'], [role='separator'], [role='slider'], [role='switch'], [role='tab'], [role='treeitem'], [role='img']), 
            img:not([alt], [aria-label], [aria-labelledby])[role]:not([role=''], [role='none'], [role='presentation']), 
            img[alt=''][role]:not([role=''], [role='none'], [role='presentation']), 
            input[type='button'][role]:not([role=''], [role='checkbox'], [role='combobox'], [role='gridcell'], [role='link'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='option'], [role='radio'], [role='separator'], [role='slider'], [role='switch'], [role='tab'], [role='treeitem'], [role='button']), 
            input[type='checkbox'][role]:not([role=''], [role='menuitemcheckbox'], [role='option'], [role='switch'], [role='checkbox']):not([role='button'][aria-pressed]), 
            input[type='color'][role]:not([role='']), 
            input[type='date'][role]:not([role='']), 
            input[type='datetime-local'][role]:not([role='']), 
            input[type='email'][role]:not([role='textbox'][list]), 
            input[type='file'][role]:not([role='']), 
            input[type='hidden'][role]:not([role='']), 
            input[type='image'][role]:not([role=''], [role='button'], [role='checkbox'], [role='gridcell'], [role='link'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='option'], [role='radio'], [role='separator'], [role='slider'], [role='switch'], [role='tab'], [role='treeitem']), 
            input[type='month'][role]:not([role='']), 
            input[type='number'][role]:not([role=''], [role='spinbutton']), 
            input[type='password'][role]:not([role='']), 
            input[type='radio'][role]:not([role=''], [role='menuitemradio'], [role='radio']), 
            input[type='range'][role]:not([role=''], [role='slider']), 
            input[type='reset'][role]:not([role=''], [role='button'], [role='checkbox'], [role='combobox'], [role='gridcell'], [role='link'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='option'], [role='radio'], [role='separator'], [role='slider'], [role='switch'], [role='tab'], [role='treeitem']), 
            input[type='search'][role]:not([role='textbox'][list]), 
            input[type='submit'][role]:not([role=''], [role='button'], [role='checkbox'], [role='combobox'], [role='gridcell'], [role='link'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='option'], [role='radio'], [role='separator'], [role='slider'], [role='switch'], [role='tab'], [role='treeitem']), 
            input[type='tel'][role]:not([role='textbox'][list]), 
            input[type='text'][role]:not([role='combobox'], [role='searchbox'], [role='spinbutton'], [role='textbox']):not([list]), 
            :is(input[type='text'], input[type='search'], input[type='tel'], input[type='url'], input[type='email'])[list][role]:not([role='combobox']), 
            input[type='url']:not([role='textbox'][list]), 
            input[type='week'][role]:not([role='']), 
            label[role]:not([role='']), 
            legend[role]:not([role='']),
            li:is(:is(ul, ol, menu, [role='list']) li)[role]:not([role=''], [role='listitem']),  
            link[role]:not([role='']), 
            main[role]:not([role='main']), 
            map[role], 
            math[role]:not([role='math']), 
            menu[role]:not([role='group'], [role='listbox'], [role='menu'], [role='menubar'], [role='none'], [role='presentation'], [role='radiogroup'], [role='tablist'], [role='toolbar'], [role='tree'], [role='list']), 
            meta[role], 
            meter[role]:not([role='meter']), 
            nav[role]:not([role='menu'], [role='menubar'], [role='none'], [role='presentation'], [role='tablist'], [role='navigation']), 
            noscript[role], 
            object[role]:not([role='application'], [role='document'], [role='img']), 
            ol[role]:not([role='group'], [role='listbox'], [role='menu'], [role='menubar'], [role='none'], [role='presentation'], [role='radiogroup'], [role='tablist'], [role='toolbar'], [role='tree'], [role='list']), 
            optgroup[role]:not([role='group']), 
            option[role]:not([role='option']), 
            param[role], 
            picture[role], 
            pre[role]:is([role='generic']),
            progress[role]:not([role='progressbar']), 
            q[role]:is([role='generic']), 
            samp[role]:is([role='generic']), 
            script[role], 
            search[role]:not([role='form'], [role='group'], [role='none'], [role='presentation'], [role='region'], [role='search']), 
            section[role]:not([role='alert'], [role='alertdialog'], [role='application'], [role='banner'], [role='complementary'], [role='contentinfo'], [role='dialog'], [role='document'], [role='feed'], [role='group'], [role='log'], [role='main'], [role='marquee'], [role='navigation'], [role='none'], [role='note'], [role='presentation'], [role='search'], [role='status'], [role='tabpanel'], [role='region']), 
            section[role]:is([role='generic']), 
            select[role]:not([multiple]):not([role='menu'], [role='combobox']),
            select[role][multiple]:not([role='listbox']), 
            slot[role], 
            small[role]:is([role='generic']), 
            source[role], 
            span[role]:is([role='generic']), 
            style[role], 
            summary:is(details summary)[role], 
            th:is(table[role='table'] th)[role]:not([role='columnheader'], [role='rowheader'], [role='cell']), 
            th:is(:is(table[role='grid'], table[role='treegrid']) th)[role]:not([role='columnheader'], [role='rowheader'], [role='gridcell']), 
            title[role], 
            tr:is(:is(table[role='table'], table[role='grid'], table[role='treegrid']) tr)[role]:not([role='row']), 
            track[role], 
            u[role]:is([role='generic']), 
            ul[role]:not([role='group'], [role='listbox'], [role='menu'], [role='menubar'], [role='none'], [role='presentation'], [role='radiogroup'], [role='tablist'], [role='toolbar'], [role='tree'], [role='list']), 
            video[role]:not([role='application']), 
            wbr[role]:not([role='none'], [role='presentation'])
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