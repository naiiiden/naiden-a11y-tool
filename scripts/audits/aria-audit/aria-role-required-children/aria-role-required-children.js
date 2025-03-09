import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaRoleRequiredChildren(auditResults) {
    const ariaRoleRequiredChildrenList = {
        feed: { requiredChildrenWithRole: ['article'], childrenWithRoleNativeHtmlEquivalent: ['article'] }, 
        grid: { requiredChildrenWithRole: ['row', 'rowgroup'], childrenWithRoleNativeHtmlEquivalent: ['tr'] }, 
        list: { requiredChildrenWithRole: ['listitem'], childrenWithRoleNativeHtmlEquivalent: ['li'] }, 
        listbox: { requiredChildrenWithRole: ['group', 'option'], childrenWithRoleNativeHtmlEquivalent: ['fieldset', 'option'] }, 
        menu: { requiredChildrenWithRole: ['group', 'menuitem', 'menuitemcheckbox', 'menuitemradio'], childrenWithRoleNativeHtmlEquivalent: ['fieldset'] }, 
        menubar: { requiredChildrenWithRole: ['group', 'menuitem', 'menuitemcheckbox', 'menuitemradio'], childrenWithRoleNativeHtmlEquivalent: ['fieldset'] }, 
        radiogroup: { requiredChildrenWithRole: ['radio'], childrenWithRoleNativeHtmlEquivalent: ['input[type="radio"]'] }, 
        row: { requiredChildrenWithRole: ['cell', 'columnheader', 'gridcell', 'rowheader'], childrenWithRoleNativeHtmlEquivalent: ['td', 'th[scope="col"]', 'th[scole="row"]'] }, 
        rowgroup: { requiredChildrenWithRole: ['row'], childrenWithRoleNativeHtmlEquivalent: ['tr'] }, 
        table: { requiredChildrenWithRole: ['row', 'rowgroup'], childrenWithRoleNativeHtmlEquivalent: ['tr'] }, 
        tablist: { requiredChildrenWithRole: ['tab'], childrenWithRoleNativeHtmlEquivalent: [] }, 
        tree: { requiredChildrenWithRole: ['group', 'treeitem'], childrenWithRoleNativeHtmlEquivalent: ['fieldset'] }, 
        treegrid: { requiredChildrenWithRole: ['row', 'rowgroup'], childrenWithRoleNativeHtmlEquivalent: ['tr'] }
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
                    element.querySelector(\`\${childRole}\`)
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