import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasAriaAllowedRole() {
  return Array.from(
    document.querySelectorAll(`
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
    `),
  )
    .filter((element) => isElementVisible(element))
    .map((element) => ({
      outerHTML: element.cloneNode().outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasAriaAllowedRoleEval(auditResults) {
  // https://dequeuniversity.com/rules/axe/4.10/aria-allowed-role
	const ariaAllowedRole = await inspectedWindowEval(`
		const getUniqueSelector = ${getUniqueSelector.toString()};
		const isElementVisible = ${isElementVisible.toString()};
		const hasAriaAllowedRole = ${hasAriaAllowedRole.toString()};

    return hasAriaAllowedRole();
	`);

  ariaAllowedRole.forEach((element) => {
    auditResults.push({
      ...ariaErrors[12],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
