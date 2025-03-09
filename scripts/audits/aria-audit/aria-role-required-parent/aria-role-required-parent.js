import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaRoleRequiredParent(auditResults) {
    const ariaRoleRequiredParentList = {
        caption: { 
            nativeHtmlEquivalent: [], requiredParent: ["figure", "grid", "table", "treegrid"], 
        },
        cell: { 
            nativeHtmlEquivalent: ["td"], requiredParent: ["row"], 
        },
        columnheader: { 
            nativeHtmlEquivalent: ["th"], requiredParent: ["row"], 
        },
        gridcell: { 
            nativeHtmlEquivalent: ["td"], requiredParent: ["row"], 
        },
        listitem: { 
            nativeHtmlEquivalent: ["li"], requiredParent: ["list", "directory"], 
        },
        menuitem: { 
            nativeHtmlEquivalent: [], requiredParent: ["group", "menu", "menubar"], 
        },
        menuitemcheckbox: { 
            nativeHtmlEquivalent: [], requiredParent: ["group", "menu", "menubar"], 
        },
        menuitemradio: { 
            nativeHtmlEquivalent: [], requiredParent: ["group", "menu", "menubar"], 
        },
        option: { 
            nativeHtmlEquivalent: ["option"], requiredParent: ["group", "listbox"], 
        },
        row: { 
            nativeHtmlEquivalent: ["tr"], requiredParent: ["grid", "rowgroup", "table", "treegrid"], 
        },
        rowgroup: { 
            nativeHtmlEquivalent: ["tbody", "tfoot", "thead"], requiredParent: ["grid", "table", "treegrid"], 
        },
        tab: { 
            nativeHtmlEquivalent: [], requiredParent: ["tablist"], 
        },
        treeitem: { 
            nativeHtmlEquivalent: [], requiredParent: ["group", "tree"], 
        }
    };

    const ariaRoleRequiredParent = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const ariaRoleRequiredParentList = ${JSON.stringify(ariaRoleRequiredParentList)};

        return Array.from(document.querySelectorAll(Object.keys(ariaRoleRequiredParentList).map(role => \`[role='\${role}']\`).join(", ")))
            .map(element => {
                const role = element.getAttribute("role");
                const roleData = ariaRoleRequiredParentList[role];
                if (!roleData) return null;

                const hasRequiredParent = roleData.requiredParent.some(parentRole =>
                    element.closest(\`[role='\${parentRole}']\`)
                );

                if (!hasRequiredParent) {
                    return {
                        outerHTML: element.cloneNode().outerHTML,
                        selector: getUniqueSelector(element),
                        missingParents: roleData
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
            helperText: `The element with role is missing a required parent with one of the following roles: ${element.missingParents.requiredParent.join(", ")}.`,
        });
    });
}