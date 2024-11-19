import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaRoleRequiredParent(auditResults) {
    const ariaRoleRequiredParentList = {
        caption: ["figure", "caption", "grid", "table", "treegrid"],
        cell: ["row"],
        columnheader: ["row"],
        gridcell: ["row"],
        listitem: ["list", "directory"],
        menuitem: ["group", "menu", "menubar"],
        menuitemcheckbox: ["group", "menu", "menubar"],
        menuitemradio: ["group", "menu", "menubar"],
        option: ["group", "listbox"],
        row: ["grid", "rowgroup", "table", "treegrid"],
        rowgroup: ["grid", "table", "treegrid"],
        tab: ["tablist"],
        treeitem: ["group", "tree"]
    }

    // https://dequeuniversity.com/rules/axe/4.10/aria-required-parent
    const ariaRoleRequiredParent = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const ariaRoleRequiredParentList = ${JSON.stringify(ariaRoleRequiredParentList)};

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
}