import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaRoleRequiredChildren(auditResults) {
    const ariaRoleRequiredChildrenList = {
        feed: ['article'], 
        grid: ['row', 'rowgroup'], 
        list: ['listitem'], 
        listbox: ['group', 'option'], 
        menu: ['group', 'menuitem', 'menuitemcheckbox', 'menuitemradio'], 
        menubar: ['group', 'menuitem', 'menuitemcheckbox', 'menuitemradio'], 
        radiogroup: ['radio'], 
        row: ['cell', 'columnheader', 'gridcell', 'rowheader'], 
        rowgroup: ['row'], 
        table: ['row', 'rowgroup'], 
        tablist: ['tab'], 
        tree: ['group', 'treeitem'], 
        treegrid: ['row', 'rowgroup']
    };

    const ariaRoleRequiredChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const ariaRoleRequiredChildrenList = ${JSON.stringify(ariaRoleRequiredChildrenList)};

        return Array.from(document.querySelectorAll(Object.keys(ariaRoleRequiredChildrenList).map(role => \`[role='\${role}']\`).join(", ")))
            .map(element => {
                const role = element.getAttribute("role");
                const requiredChildren = ariaRoleRequiredChildrenList[role];
                if (!requiredChildren) return null;

                const hasRequiredChildren = requiredChildren.some(childRole =>
                    element.querySelector(\`[role='\${childRole}']\`)
                );

                if (!hasRequiredChildren) {
                    return {
                        outerHTML: element.cloneNode().outerHTML,
                        selector: getUniqueSelector(element),
                        missingChildren: requiredChildren
                    };
                }

                return null;
            })
            .filter(result => result !== null);
    `);

    ariaRoleRequiredChildren.forEach(element => {
        auditResults.push({
            ...ariaErrors[18],
            element: element.outerHTML,
            selector: element.selector,
            helperText: `The element with role is missing required children with the following roles: ${element.missingChildren.join(", ")}.`,
        });
    });
}