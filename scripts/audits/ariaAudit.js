import { ariaErrors } from "../errors/aria.js";
import { getUniqueSelector, inspectedWindowEval } from "../utils.js";

export async function ariaAudit(auditResults) {
    // https://dequeuniversity.com/rules/axe/4.10/aria-hidden-body
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

    // https://dequeuniversity.com/rules/axe/4.10/aria-command-name
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

    // https://dequeuniversity.com/rules/axe/4.10/aria-meter-name
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

    // https://dequeuniversity.com/rules/axe/4.10/aria-progressbar-name
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

    // https://dequeuniversity.com/rules/axe/4.10/aria-tooltip-name
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

    // https://dequeuniversity.com/rules/axe/4.10/aria-deprecated-role
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

    // https://dequeuniversity.com/rules/axe/4.10/aria-input-field-name
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

    // https://dequeuniversity.com/rules/axe/4.10/aria-toggle-field-name
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

    // https://dequeuniversity.com/rules/axe/4.10/aria-hidden-focus
    const ariaHiddenFocusableOrWithFocusableChildren = await inspectedWindowEval(`
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

    ariaHiddenFocusableOrWithFocusableChildren.forEach(element => {
        auditResults.push({ ...ariaErrors[8], element: element.outerHTML, selector: element.selector });
    })

    // https://dequeuniversity.com/rules/axe/4.10/aria-roles
    const ariaRoleValidValues = await inspectedWindowEval(`
        const validAriaRoles = new Set([
            "", "application", "article", "blockquote", "caption", "document", "feed", "group", "heading", "list", "listitem",
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

    // https://dequeuniversity.com/rules/axe/4.10/aria-dialog-name
    const ariaDialogAndAlertDialogNames = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='dialog'], [role='alertdialog']"))
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

    // https://dequeuniversity.com/rules/axe/4.10/aria-text
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

    // https://dequeuniversity.com/rules/axe/4.10/aria-allowed-role
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
            input[type='file'][role]:not([role='']), 
            input[type='hidden'][role]:not([role='']), 
            input[type='image'][role]:not([role=''], [role='button'], [role='checkbox'], [role='gridcell'], [role='link'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='option'], [role='radio'], [role='separator'], [role='slider'], [role='switch'], [role='tab'], [role='treeitem']), 
            input[type='month'][role]:not([role='']), 
            input[type='number'][role]:not([role=''], [role='spinbutton']), 
            input[type='password'][role]:not([role='']), 
            input[type='radio'][role]:not([role=''], [role='menuitemradio'], [role='radio']), 
            input[type='range'][role]:not([role=''], [role='slider']), 
            input[type='reset'][role]:not([role=''], [role='button'], [role='checkbox'], [role='combobox'], [role='gridcell'], [role='link'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='option'], [role='radio'], [role='separator'], [role='slider'], [role='switch'], [role='tab'], [role='treeitem']), 
            input[type='submit'][role]:not([role=''], [role='button'], [role='checkbox'], [role='combobox'], [role='gridcell'], [role='link'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'], [role='option'], [role='radio'], [role='separator'], [role='slider'], [role='switch'], [role='tab'], [role='treeitem']), 
            input[type='email'][role]:not([role=''], [role='textbox'], [list]), 
            input[type='search'][role]:not([role=''], [role='searchbox'], [list]), 
            input[type='tel'][role]:not([role=''], [role='textbox'], [list]),  
            input[type='url'][role]:not([role=''], [role='textbox'], [list]), 
            input[type='text'][role]:not([role=''], [role='combobox'], [role='searchbox'], [role='spinbutton'], [role='textbox'], [list]), 
            :is(input[type='text'], input[type='search'], input[type='tel'], input[type='url'], input[type='email'])[role]:not([role=''], [role='combobox'])[list], 
            input[type='time'][role]:not([role='']), 
            input[type='week'][role]:not([role='']), 
            label[role]:not([role='']), 
            legend[role]:not([role='']),
            li:is(:is(ul, ol, menu, [role='list']) li)[role]:not([role=''], [role='listitem']),  
            link[role]:not([role='']), 
            main[role]:not([role=''], [role='main']), 
            map[role]:not([role='']), 
            math[role]:not([role=''], [role='math']), 
            menu[role]:not([role=''], [role='group'], [role='listbox'], [role='menu'], [role='menubar'], [role='none'], [role='presentation'], [role='radiogroup'], [role='tablist'], [role='toolbar'], [role='tree'], [role='list']), 
            meta[role]:not([role='']), 
            meter[role]:not([role=''], [role='meter']), 
            nav[role]:not([role=''], [role='menu'], [role='menubar'], [role='none'], [role='presentation'], [role='tablist'], [role='navigation']), 
            noscript[role]:not([role='']), 
            object[role]:not([role=''], [role='application'], [role='document'], [role='img']), 
            ol[role]:not([role=''], [role='group'], [role='listbox'], [role='menu'], [role='menubar'], [role='none'], [role='presentation'], [role='radiogroup'], [role='tablist'], [role='toolbar'], [role='tree'], [role='list']), 
            optgroup[role]:not([role=''], [role='group']), 
            option[role]:not([role=''], [role='option']), 
            param[role]:not([role='']), 
            picture[role]:not([role='']), 
            pre[role]:is([role='generic']),
            progress[role]:not([role=''], [role='progressbar']), 
            q[role]:is([role='generic']), 
            samp[role]:is([role='generic']), 
            script[role]:not([role='']), 
            search[role]:not([role=''], [role='form'], [role='group'], [role='none'], [role='presentation'], [role='region'], [role='search']), 
            section[role]:not([role=''], [role='alert'], [role='alertdialog'], [role='application'], [role='banner'], [role='complementary'], [role='contentinfo'], [role='dialog'], [role='document'], [role='feed'], [role='group'], [role='log'], [role='main'], [role='marquee'], [role='navigation'], [role='none'], [role='note'], [role='presentation'], [role='search'], [role='status'], [role='tabpanel'], [role='region']), 
            section[role]:is([role='generic']), 
            select[role]:not([multiple]):not([role=''], [role='menu'], [role='combobox']),
            select[role][multiple]:not([role=''], [role='listbox']), 
            slot[role]:not([role='']), 
            small[role]:is([role='generic']), 
            source[role]:not([role='']), 
            span[role]:is([role='generic']), 
            style[role]:not([role='']), 
            summary:is(details summary)[role]:not([role='']), 
            td:is(table[role='table'] td)[role]:not([role=''], [role='cell']), 
            td:is(:is(table[role='grid'], table[role='treegrid']) td)[role]:not([role=''], [role='gridcell']), 
            template[role]:not([role='']), 
            textarea[role]:not([role=''], [role='textbox']), 
            th:is(table[role='table'] th)[role]:not([role=''], [role='columnheader'], [role='rowheader'], [role='cell']), 
            th:is(:is(table[role='grid'], table[role='treegrid']) th)[role]:not([role=''], [role='columnheader'], [role='rowheader'], [role='gridcell']), 
            title[role]:not([role='']), 
            tr:is(:is(table[role='table'], table[role='grid'], table[role='treegrid']) tr)[role]:not([role=''], [role='row']), 
            track[role]:not([role='']), 
            u[role]:is([role='generic']), 
            ul[role]:not([role=''], [role='group'], [role='listbox'], [role='menu'], [role='menubar'], [role='none'], [role='presentation'], [role='radiogroup'], [role='tablist'], [role='toolbar'], [role='tree'], [role='list']), 
            video[role]:not([role=''], [role='application']), 
            wbr[role]:not([role=''], [role='none'], [role='presentation'])
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element),
            }));
    `)

    ariaAppropriateRole.forEach(element => {
        auditResults.push({ ...ariaErrors[12], element: element.outerHTML, selector: element.selector });
    });

    // https://dequeuniversity.com/rules/axe/4.10/aria-treeitem-name
    const ariaTreeitemNames = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("[role='treeitem']:empty"))
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

    ariaTreeitemNames.forEach(element => {
        auditResults.push({ ...ariaErrors[13], element: element.outerHTML, selector: element.selector });
    });

    // https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr-value
    const ariaAttributesValidValues = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            [aria-atomic]:not([aria-atomic=''], [aria-atomic='true'], [aria-atomic='false']), 
            [aria-busy]:not([aria-busy=''], [aria-busy='true'], [aria-busy='false']), 
            [aria-current]:not([aria-current=''], [aria-current='page'], [aria-current='step'], [aria-current='location'], [aria-current='date'], [aria-current='time']), 
            [aria-disabled]:not([aria-disabled=''], [aria-disabled='true'], [aria-disabled='false']), 
            [aria-dropeffect]:not([aria-dropeffect=''], [aria-dropeffect='copy'], [aria-dropeffect='execute'], [aria-dropeffect='link'], [aria-dropeffect='move'], [aria-dropeffect='none'], [aria-dropeffect='popup']), 
            [aria-grabbed]:not([aria-grabbed=''], [aria-grabbed='true'], [aria-grabbed='false'], [aria-grabbed='undefined']), 
            [aria-haspopup]:not([aria-haspopup=''], [aria-haspopup='true'], [aria-haspopup='false'], [aria-haspopup='menu'], [aria-haspopup='listbox'], [aria-haspopup='tree'], [aria-haspopup='grid'], [aria-haspopup='dialog']), 
            [aria-hidden]:not([aria-hidden=''], [aria-hidden='true'], [aria-hidden='false'], [aria-hidden='undefined']), 
            [aria-invalid]:not([aria-invalid=''], [aria-invalid='true'], [aria-invalid='false'], [aria-invalid='grammar'], [aria-invalid='spelling']), 
            [aria-live]:not([aria-live=''], [aria-live='off'], [aria-live='assertive'], [aria-live='polite']), 
            [aria-relevant]:not([aria-relevant=''], [aria-relevant='additions'], [aria-relevant='additions text'], [aria-relevant='all'], [aria-relevant='removals'], [aria-relevant='text']), 
            [aria-autocomplete]:not([aria-autocomplete=''], [aria-autocomplete='inline'], [aria-autocomplete='list'], [aria-autocomplete='both'], [aria-autocomplete='none']), 
            [aria-checked]:not([aria-checked=''], [aria-checked='true'], [aria-checked='false'], [aria-checked='mixed'], [aria-checked='undefined']), 
            [aria-disabled]:not([aria-disabled=''], [aria-disabled='true'], [aria-disabled='false']), 
            [aria-expanded]:not([aria-expanded=''], [aria-expanded='true'], [aria-expanded='false'], [aria-expanded='undefined']), 
            [aria-modal]:not([aria-modal=''], [aria-modal='true'], [aria-modal='false']), 
            [aria-multiline]:not([aria-multiline=''], [aria-multiline='true'], [aria-multiline='false']), 
            [aria-multiselectable]:not([aria-multiselectable=''], [aria-multiselectable='true'], [aria-multiselectable='false']), 
            [aria-orientation]:not([aria-orientation=''], [aria-orientation='horizontal'], [aria-orientation='vertical'], [aria-orientation='undefined']), 
            [aria-pressed]:not([aria-pressed=''], [aria-pressed='true'], [aria-pressed='false'], [aria-pressed='mixed'], [aria-pressed='undefined']), 
            [aria-readonly]:not([aria-readonly=''], [aria-readonly='true'], [aria-readonly='false']), 
            [aria-required]:not([aria-required=''], [aria-required='true'], [aria-required='false']), 
            [aria-selected]:not([aria-selected=''], [aria-selected='true'], [aria-selected='false'], [aria-selected='undefined']), 
            [aria-sort]:not([aria-sort=''], [aria-sort='ascending'], [aria-sort='descending'], [aria-sort='none'], [aria-sort='other'])
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element),
            }));
    `)

    ariaAttributesValidValues.forEach(element => {
        auditResults.push({ ...ariaErrors[14], element: element.outerHTML, selector: element.selector });
    });

    const ariaValidAttributesArray = [
        'aria-activedescendant', 'aria-atomic', 'aria-autocomplete', 'aria-busy', 'aria-checked', 'aria-colcount',
        'aria-colindex', 'aria-colspan', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
        'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-expanded', 'aria-flowto', 'aria-grabbed', 
        'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 
        'aria-level', 'aria-live', 'aria-modal', 'aria-multiline', 'aria-multiselectable', 'aria-orientation', 
        'aria-owns', 'aria-placeholder', 'aria-posinset', 'aria-pressed', 'aria-readonly', 'aria-relevant', 
        'aria-required', 'aria-roledescription', 'aria-rowcount', 'aria-rowindex', 'aria-rowspan', 'aria-selected', 
        'aria-setsize', 'aria-sort', 'aria-valuemax', 'aria-valuemin', 'aria-valuenow', 'aria-valuetext'
    ];

    // https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr
    const ariaValidAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('*'))
            .flatMap(element => 
                Array.from(element.attributes)
                    .filter(attr => attr.name.startsWith('aria') && !${JSON.stringify(ariaValidAttributesArray)}.includes(attr.name))
                    .map(attr => ({
                        outerHTML: element.outerHTML,
                        selector: getUniqueSelector(element)
                    }))
        );
    `);

    ariaValidAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[15], element: element.outerHTML, selector: element.selector });
    });

    const ariaRoleSupportedAriaAttributesList = {
        alert: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hddien', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 
            'aria-relevant', 'aria-roledescription'
        ], 
        alertdialog: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-modal', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ], 
        application: [
            'aria-activedescendant', 'aria-disabled', 'aria-errormessage', 'aria-expanded', 'aria-haspopup', 'aria-invalid', 
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-hidden', 'aria-keyshortcuts', 'aria-label', 
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ], 
        article: [
            'aria-posinset', 'aria-setsize', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 
            'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        banner: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        blockquote: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        button: [
            'aria-disabled', 'aria-haspopup', 'aria-expanded', 'aria-pressed', 'aria-atomic', 'aria-busy',
            'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-dropeffect', 'aria-errormessage',
            'aria-flowto', 'aria-grabbed', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        caption: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 
            'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        cell: [
            'aria-colindex', 'aria-colspan', 'aria-rowindex', 'aria-rowspan', 'aria-atomic', 'aria-busy',
            'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect',
            'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant',
            'aria-roledescription'
        ],
        checkbox: [
            'aria-checked', 'aria-errormessage', 'aria-expanded', 'aria-invalid', 'aria-readonly', 'aria-required',
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant',
            'aria-roledescription'
        ],
        code: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        columnheader: [
            'aria-sort', 'aria-atomic', 'aria-busy', 'aria-colindex', 'aria-colspan', 'aria-controls',
            'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage',
            'aria-expanded', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-readonly', 
            'aria-relevant', 'aria-required', 'aria-roledescription', 'aria-rowindex', 'aria-rowspan', 'aria-selected'
        ],
        combobox: [
            'aria-controls', 'aria-expanded', 'aria-activedescendant', 'aria-autocomplete', 'aria-errormessage', 'aria-haspopup',
            'aria-invalid', 'aria-readonly', 'aria-required', 'aria-atomic', 'aria-busy', 'aria-current',
            'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 
            'aria-hidden', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 
            'aria-relevant', 'aria-roledescription'
        ],
        complementary: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        contentinfo: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],  
        definition: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        dialog: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-modal', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        directory: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        document: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        emphasis: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        feed: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        figure: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        form: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        generic: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant'
        ],
        gridcell: [
            'aria-disabled', 'aria-errormessage', 'aria-expanded', 'aria-haspopup', 'aria-invalid', 'aria-readonly',
            'aria-required', 'aria-selected', 'aria-atomic', 'aria-busy', 'aria-colindex', 'aria-colspan',
            'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-dropeffect', 'aria-flowto', 
            'aria-grabbed', 'aria-hidden', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-rowindex', 'aria-rowspan'
        ],
        group: [
            'aria-activedescendant', 'aria-disabled', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current',
            'aria-describedby', 'aria-details', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed',
            'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby',
            'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        heading: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-level'
        ],
        img: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        insertion: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        link: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-expanded'
        ],
        list: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        listbox: [
            'aria-errormessage', 'aria-expanded', 'aria-invalid', 'aria-multiselectable', 'aria-readonly', 'aria-required',
            'aria-activedescendant', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby',
            'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-orientation',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        listitem: [
            'aria-level', 'aria-posinset', 'aria-setsize', 'aria-atomic', 'aria-busy', 'aria-controls',
            'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage',
            'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts',
            'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        log: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        main: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        marquee: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        math: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        menu: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-activedescendant', 'aria-orientation'
        ],
        menubar: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-activedescendant', 'aria-orientation'
        ],
        menuitem: [
            'aria-disabled', 'aria-expanded', 'aria-haspopup', 'aria-posinset', 'aria-setsize', 'aria-atomic',
            'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-dropeffect',
            'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts',
            'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        menuitemcheckbox: [
            'aria-checked', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby',
            'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-expanded', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-posinset', 'aria-relevant', 'aria-roledescription',
            'aria-setsize'
        ],
        menuitemradio: [
            'aria-checked', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby',
            'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-expanded', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-posinset', 'aria-relevant', 'aria-roledescription',
            'aria-setsize'
        ],
        meter: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-valuemax', 'aria-valuemin', 'aria-valuetext'
        ],
        navigation: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        none: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        note: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        option: [
            'aria-selected', 'aria-checked', 'aria-posinset', 'aria-setsize', 'aria-atomic', 'aria-busy',
            'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect',
            'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant',
            'aria-roledescription'
        ],
        paragraph: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ], 
        presentation: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        progressbar: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-valuemax', 'aria-valuemin', 'aria-valuetext',
            'aria-valuenow'
        ],
        radio: [
            'aria-posinset', 'aria-setsize', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current',
            'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        radiogroup: [
            'aria-errormessage', 'aria-invalid', 'aria-readonly', 'aria-required', 'aria-activedescendant', 'aria-atomic',
            'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled',
            'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-keyshortcuts',
            'aria-label', 'aria-labelledby', 'aria-live', 'aria-orientation', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        region: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'ari-alabel', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        row: [
            'aria-colindex', 'aria-expanded', 'aria-level', 'aria-posinset', 'aria-rowindex', 'aria-setsize',
            'aria-selected', 'aria-activedescendant', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current',
            'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        rowgroup: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'ari-alabel', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        rowheader: [
            'aria-expanded', 'aria-sort', 'aria-atomic', 'aria-busy', 'aria-colindex', 'aria-colspan',
            'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect',
            'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-readonly',
            'aria-relevant', 'aria-required', 'aria-roledescription', 'aria-rowindex', 'aria-rowspan', 'aria-selected'
        ],
        scrollbar: [
            'aria-controls', 'aria-valuenow', 'aria-disabled', 'aria-orientation', 'aria-valuemax', 'aria-valuemin',
            'aria-atomic', 'aria-busy', 'aria-current', 'aria-describedby', 'aria-details', 'aria-dropeffect',
            'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant',
            'aria-roledescription', 'aria-valuetext'
        ],
        search: [  
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'ari-alabel', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        searchbox: [
            'aria-activedescendant', 'aria-atomic', 'aria-autocomplete', 'aria-busy', 'aria-controls', 'aria-current',
            'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
            'aria-labelledby', 'aria-live', 'aria-multiline', 'aria-owns', 'aria-placeholder', 'aria-readonly',
            'aria-relevant', 'aria-required', 'aria-roledescription'
        ],
        separator: [
            'aria-disabled', 'aria-orientation', 'aria-valuemax', 'aria-valuemin', 'aria-valuetext', 'aria-atomic',
            'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-dropeffect',
            'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant',
            'aria-roledescription', 'aria-valuenow'
        ],
        slider: [
            'aria-errormessage', 'aria-haspopup', 'aria-invalid', 'aria-orientation', 'aria-readonly', 'aria-valuemax',
            'aria-valuemin', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby',
            'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-hidden',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant',
            'aria-roledescription', 'aria-valuetext'
        ], 
        spinbutton: [
            'aria-errormessage', 'aria-invalid', 'aria-readonly', 'aria-required', 'aria-valuemax', 'aria-valuemin',
            'aria-valuenow', 'aria-valuetext', 'aria-activedescendant', 'aria-atomic', 'aria-busy', 'aria-controls',
            'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby',
            'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        status: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ], 
        strong: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        subscript: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        superscript: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        switch: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-live', 'aria-owns', 'aria-relevant', 
            'aria-required', 'aria-label', 'aria-labelledby', 'aria-roledescription', 'aria-checked', 'aria-expanded',
            'aria-readonly'
        ],
        tab: [
            'aria-disabled', 'aria-expanded', 'aria-haspopup', 'aria-posinset', 'aria-selected', 'aria-setsize',
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-hidden', 'aria-invalid',
            'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant',
            'aria-roledescription'
        ],
        table: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-colcount', 'aria-rowcount'
        ],
        tablist: [
            'aria-multiselectable', 'aria-orientation', 'aria-activedescendant', 'aria-atomic', 'aria-busy', 'aria-controls',
            'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage',
            'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts',
            'aria-label', 'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        tabpanel: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        term: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        textbox: [
            'aria-activedescendant', 'aria-autocomplete', 'aria-errormessage', 'aria-haspopup', 'aria-invalid', 'aria-multiline',
            'aria-placeholder', 'aria-readonly', 'aria-required', 'aria-atomic', 'aria-busy', 'aria-controls',
            'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-flowto',
            'aria-grabbed', 'aria-hidden', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        time: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        timer: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        toolbar: [
            'aria-orientation', 'aria-activedescendant', 'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current',
            'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label',
            'aria-labelledby', 'aria-live', 'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        tooltip: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live', 
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        tree: [
            'aria-errormessage', 'aria-invalid', 'aria-multiselectable', 'aria-required', 'aria-activedescendant', 'aria-atomic',
            'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled',
            'aria-dropeffect', 'aria-flowto', 'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-keyshortcuts',
            'aria-label', 'aria-labelledby', 'aria-live', 'aria-orientation', 'aria-owns', 'aria-relevant', 
            'aria-roledescription'
        ],
        treegrid: [
            'aria-activedescendant', 'aria-atomic', 'aria-busy', 'aria-colcount', 'aria-controls', 'aria-current',
            'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto',
            'aria-grabbed', 'aria-haspopup', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 
            'aria-labelledby', 'aria-live', 'aria-multiselectable', 'aria-orientation', 'aria-owns', 'aria-readonly', 
            'aria-relevant', 'aria-required', 'aria-roledescription', 'aria-rowcount'
        ],
        treeitem: [
            'aria-expanded', 'aria-haspopup', 'aria-atomic', 'aria-busy', 'aria-checked', 'aria-controls',
            'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect', 'aria-errormessage',
            'aria-flowto', 'aria-grabbed', 'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 
            'aria-labelledby', 'aria-level', 'aria-live', 'aria-owns', 'aria-posinset', 'aria-relevant', 
            'aria-roledescription', 'aria-selected', 'aria-setsize'
        ],
        widget: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription'
        ],
        window: [
            'aria-atomic', 'aria-busy', 'aria-controls', 'aria-current', 'aria-describedby', 'aria-details',
            'aria-disabled', 'aria-dropeffect', 'aria-errormessage', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
            'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby', 'aria-live',
            'aria-owns', 'aria-relevant', 'aria-roledescription', 'aria-modal'
        ]
    }

    // https://dequeuniversity.com/rules/axe/4.10/aria-allowed-attr
    const ariaRoleSupportedAriaAttributes = await inspectedWindowEval(`
        const ariaRoleSupportedAriaAttributesList = ${JSON.stringify(ariaRoleSupportedAriaAttributesList)};
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('[role]'))
            .flatMap(element => {
                const validAttributes = ariaRoleSupportedAriaAttributesList[element.getAttribute('role')] || [];
                return Array.from(element.attributes)
                    .filter(attr => attr.name.startsWith('aria') && !validAttributes.includes(attr.name))
                    .map(attr => ({
                        outerHTML: element.outerHTML,
                        selector: getUniqueSelector(element)
                    }))
        });
    `);

    ariaRoleSupportedAriaAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[16], element: element.outerHTML, selector: element.selector });
    });

    // https://dequeuniversity.com/rules/axe/4.10/aria-required-attr
    const ariaRoleRequiredAriaAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            [role='checkbox']:not([aria-checked]), 
            [role='combobox']:not([aria-controls], [aria-expanded]), 
            [role='heading']:not([aria-level]), 
            [role='meter']:not([aria-valuenow]), 
            [role='menuitemcheckbox']:not([aria-checked]), 
            [role='option']:not([aria-selected]), 
            [role='radio']:not([aria-checked]), 
            [role='scrollbar']:not([aria-controls], [aria-valuenow]), 
            [role='separator']:not([aria-valuenow]), 
            [role='slider']:not([aria-valuenow]), 
            [role='switch']:not([aria-checked])
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }))
    `)

    ariaRoleRequiredAriaAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[17], element: element.outerHTML, selector: element.selector });
    });

    // https://dequeuniversity.com/rules/axe/4.10/aria-required-children
    const ariaRoleRequiredChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            [role='feed']:not(:has([role='article'])), 
            [role='grid']:not(:has([role='row'], [role='rowgroup'])), 
            [role='list']:not(:has([role='listitem'])), 
            [role='listbox']:not(:has([role='group'], [role='option'])), 
            [role='menu']:not(:has([role='group'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'])), 
            [role='menubar']:not(:has([role='group'], [role='menuitem'], [role='menuitemcheckbox'], [role='menuitemradio'])), 
            [role='radiogroup']:not(:has([role='radio'])), 
            [role='row']:not(:has([role='cell'], [role='columnheader'], [role='gridcell'], [role='rowheader'])), 
            [role='rowgroup']:not(:has([role='row'])), 
            [role='table']:not(:has([role='row'], [role='rowgroup'])), 
            [role='tablist']:not(:has([role='tab'])), 
            [role='tree']:not(:has([role='group'], [role='treeitem'])), 
            [role='treegrid']:not(:has([role='row'], [role='rowgroup']))
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }))
    `)

    ariaRoleRequiredChildren.forEach(element => {
        auditResults.push({ ...ariaErrors[18], element: element.outerHTML, selector: element.selector });
    });

    // https://dequeuniversity.com/rules/axe/4.10/aria-required-parent
    const ariaRoleRequiredParent = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            [role='caption']:is(:not([role='figure'] [role='caption'], [role='grid'] [role='caption'], [role='table'] [role='caption'], [role='treegrid'] [role='caption'])), 
            [role='cell']:is(:not([role='row'] [role='cell'])), 
            [role='columnheader']:is(:not([role='row'] [role='columnheader'])), 
            [role='gridcell']:is(:not([role='row'] [role='gridcell'])), 
            [role='listitem']:is(:not([role='list'] [role='listitem'], [role='directory'] [role='listitem'])), 
            [role='menuitem']:is(:not([role='group'] [role='menuitem'], [role='menu'] [role='menuitem'], [role='menubar'] [role='menuitem'])),
            [role='menuitemcheckbox']:is(:not([role='group'] [role='menuitemcheckbox'], [role='menu'] [role='menuitemcheckbox'], [role='menubar'] [role='menuitemcheckbox'])),
            [role='menuitemradio']:is(:not([role='group'] [role='menuitemradio'], [role='menu'] [role='menuitemradio'], [role='menubar'] [role='menuitemradio'])),
            [role='option']:is(:not([role='group'] [role='option'], [role='listbox'] [role='option'])), 
            [role='row']:is(:not([role='grid'] [role='row'], [role='rowgroup'] [role='row'], [role='table'] [role='row'], [role='treegrid'] [role='row'])),
            [role='rowgroup']:is(:not([role='grid'] [role='rowgroup'], [role='table'] [role='rowgroup'], [role='treegrid'] [role='rowgroup'])),
            [role='rowheader']:is(:not([role='row'] [role='rowheader'])), 
            [role='tab']:is(:not([role='tablist'] [role='tab'])),
            [role='treeitem']:is(:not([role='group'] [role='treeitem'], [role='tree'] [role='treeitem']))
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }))
    `)

    ariaRoleRequiredParent.forEach(element => {
        auditResults.push({ ...ariaErrors[19], element: element.outerHTML, selector: element.selector });
    });

    // https://dequeuniversity.com/rules/axe/4.10/aria-prohibited-attr
    const ariaRolePermittedAttributes = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            [role='caption']:has([aria-label], [aria-labelledby]), 
            [role='code']:has([aria-label], [aria-labelledby]), 
            [role='deletion']:has([aria-label], [aria-labelledby]), 
            [role='emphasis']:has([aria-label], [aria-labelledby]), 
            [role='generic']:has([aria-label], [aria-labelledby], [aria-roledescription]), 
            [role='insertion']:has([aria-label], [aria-labelledby]), 
            [role='paragraph']:has([aria-label], [aria-labelledby]), 
            [role='presentation']:has([aria-label], [aria-labelledby]), 
            [role='strong']:has([aria-label], [aria-labelledby]), 
            [role='subscript']:has([aria-label], [aria-labelledby]), 
            [role='superscript']:has([aria-label], [aria-labelledby])
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }))
    `)

    ariaRolePermittedAttributes.forEach(element => {
        auditResults.push({ ...ariaErrors[20], element: element.outerHTML, selector: element.selector });
    });
}