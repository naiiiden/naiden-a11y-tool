import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaRoleRequiredChildren(auditResults) {
    const ariaRoleRequiredChildrenList = {
        feed: { 
            requiredChildrenWithRole: ['article'], 
            requiredChildrenWithRoleNativeHtmlEquivalent: ['article'] 
        }, 
        grid: { 
            requiredChildrenWithRole: ['row', 'rowgroup'], 
            requiredChildrenWithRoleNativeHtmlEquivalent: ['tr'] 
        }, 
        list: { 
            requiredChildrenWithRole: ['listitem'], 
            requiredChildrenWithRoleNativeHtmlEquivalent: ['li'] 
        }, 
        listbox: { 
            requiredChildrenWithRole: ['group', 'option'], 
            requiredChildrenWithRoleNativeHtmlEquivalent: ['fieldset', 'option'] 
        }, 
        menu: { 
            requiredChildrenWithRole: ['group', 'menuitem', 'menuitemcheckbox', 'menuitemradio'], 
            requiredChildrenWithRoleNativeHtmlEquivalent: ['fieldset'] 
        }, 
        menubar: { 
            requiredChildrenWithRole: ['group', 'menuitem', 'menuitemcheckbox', 'menuitemradio'], 
            requiredChildrenWithRoleNativeHtmlEquivalent: ['fieldset'] 
        }, 
        radiogroup: { 
            requiredChildrenWithRole: ['radio'], 
            requiredChildrenWithRoleNativeHtmlEquivalent: ['input[type="radio"]'] 
        }, 
        row: { 
            requiredChildrenWithRole: ['cell', 'columnheader', 'gridcell', 'rowheader'], 
            requiredChildrenWithRoleNativeHtmlEquivalent: ['td', 'th[scope="col"]', 'th[scole="row"]'] 
        }, 
        rowgroup: { 
            requiredChildrenWithRole: ['row'], 
            requiredChildrenWithRoleNativeHtmlEquivalent: ['tr'] 
        }, 
        table: { 
            requiredChildrenWithRole: ['row', 'rowgroup'], 
            requiredChildrenWithRoleNativeHtmlEquivalent: ['tr'] 
        }, 
        tablist: { 
            requiredChildrenWithRole: ['tab'], 
            requiredChildrenWithRoleNativeHtmlEquivalent: [] 
        }, 
        tree: { 
            requiredChildrenWithRole: ['group', 'treeitem'], 
            requiredChildrenWithRoleNativeHtmlEquivalent: ['fieldset'] 
        }, 
        treegrid: { 
            requiredChildrenWithRole: ['row', 'rowgroup'], 
            requiredChildrenWithRoleNativeHtmlEquivalent: ['tr'] 
        }
    };

    const ariaRoleRequiredChildren = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const ariaRoleRequiredChildrenList = ${JSON.stringify(ariaRoleRequiredChildrenList)};

        return Array.from(document.querySelectorAll(Object.keys(ariaRoleRequiredChildrenList).map(role => \`[role='\${role}']\`).join(", ")))
            .map(element => {
                const role = element.getAttribute("role");
                const roleData = ariaRoleRequiredChildrenList[role];
                if (!roleData) return null;

                console.log(1, role);
                console.log(2, roleData);
                console.log(3, element);

                const hasRequiredChildrenWithRole = roleData.requiredChildrenWithRole.some(child =>
                    element.querySelector(\`[role='\${child}']\`)
                );

                const hasRequiredChildrenWithRoleNativeHtmlEquivalent = roleData.requiredChildrenWithRoleNativeHtmlEquivalent.some(child =>
                    element.querySelector(child)
                );

                if (!hasRequiredChildrenWithRole && !hasRequiredChildrenWithRoleNativeHtmlEquivalent) {
                    return {
                        outerHTML: element.cloneNode().outerHTML,
                        selector: getUniqueSelector(element),
                        missingChildren: roleData
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