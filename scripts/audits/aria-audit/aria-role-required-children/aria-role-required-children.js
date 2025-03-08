import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaRoleRequiredChildren(auditResults) {
    const ariaRoleRequiredChildrenList = {
        feed: { requiredChildrenWithRole: ['article'], childrenWithRoleNativeHtmlEquivalent: [] }, 
        grid: { requiredChildrenWithRole: ['row', 'rowgroup'], childrenWithRoleNativeHtmlEquivalent: [] }, 
        list: { requiredChildrenWithRole: ['listitem'], childrenWithRoleNativeHtmlEquivalent: [] }, 
        listbox: { requiredChildrenWithRole: ['group', 'option'], childrenWithRoleNativeHtmlEquivalent: [] }, 
        menu: { requiredChildrenWithRole: ['group', 'menuitem', 'menuitemcheckbox', 'menuitemradio'], childrenWithRoleNativeHtmlEquivalent: [] }, 
        menubar: { requiredChildrenWithRole: ['group', 'menuitem', 'menuitemcheckbox', 'menuitemradio'], childrenWithRoleNativeHtmlEquivalent: [] }, 
        radiogroup: { requiredChildrenWithRole: ['radio'], childrenWithRoleNativeHtmlEquivalent: [] }, 
        row: { requiredChildrenWithRole: ['cell', 'columnheader', 'gridcell', 'rowheader'], childrenWithRoleNativeHtmlEquivalent: [] }, 
        rowgroup: { requiredChildrenWithRole: ['row'], childrenWithRoleNativeHtmlEquivalent: [] }, 
        table: { requiredChildrenWithRole: ['row', 'rowgroup'], childrenWithRoleNativeHtmlEquivalent: [] }, 
        tablist: { requiredChildrenWithRole: ['tab'], childrenWithRoleNativeHtmlEquivalent: [] }, 
        tree: { requiredChildrenWithRole: ['group', 'treeitem'], childrenWithRoleNativeHtmlEquivalent: [] }, 
        treegrid: { requiredChildrenWithRole: ['row', 'rowgroup'], childrenWithRoleNativeHtmlEquivalent: [] }
    };

    const ariaRoleRequiredChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const ariaRoleRequiredChildrenList = ${JSON.stringify(ariaRoleRequiredChildrenList)};

        return Array.from(document.querySelectorAll(Object.keys(ariaRoleRequiredChildrenList).map(role => \`[role='\${role}']\`).join(", ")))
            .map(element => {
                const role = element.getAttribute("role");
                const requiredChildren = ariaRoleRequiredChildrenList[role];
                if (!requiredChildren) return null;

                const hasRequiredChildren = requiredChildren.requiredChildrenWithRole.some(childRole =>
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
            helperText: `The element with role is missing required children with the following roles: ${element.missingChildren.requiredChildrenWithRole.join(", ")}.`,
        });
    });
}