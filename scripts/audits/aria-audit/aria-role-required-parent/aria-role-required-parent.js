import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaRoleRequiredParent(auditResults) {
    const ariaRoleRequiredParentList = {
        caption: ["figure", "grid", "table", "treegrid"],
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
    };

    const ariaRoleRequiredParent = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const ariaRoleRequiredParentList = ${JSON.stringify(ariaRoleRequiredParentList)};

        return Array.from(document.querySelectorAll(Object.keys(ariaRoleRequiredParentList).map(role => \`[role='\${role}']\`).join(", ")))
            .map(element => {
                const role = element.getAttribute("role");
                const requiredParents = ariaRoleRequiredParentList[role];
                if (!requiredParents) return null;

                const hasRequiredParent = requiredParents.some(parentRole =>
                    element.closest(\`[role='\${parentRole}']\`)
                );

                if (!hasRequiredParent) {
                    return {
                        outerHTML: element.cloneNode().outerHTML,
                        selector: getUniqueSelector(element),
                        missingParents: requiredParents
                    };
                }

                return null;
            })
            .filter(result => result !== null);
    `);

    ariaRoleRequiredParent.forEach(element => {
        auditResults.push({
            ...ariaErrors[19],
            element: element.outerHTML,
            selector: element.selector,
            helperText: `The element with role is missing a required parent with one of the following roles: ${element.missingParents.join(", ")}.`,
        });
    });
}