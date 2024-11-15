import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaRoleRequiredChildren(auditResults) {
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
}