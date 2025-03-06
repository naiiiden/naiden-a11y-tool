import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaRoleRequiredParent(auditResults) {
    const ariaRoleRequiredParentList = {
        caption: { requiredParent: ["figure", "grid", "table", "treegrid"], nativeHTMLEquivalent: [] },
        cell: { requiredParent: ["row"], nativeHTMLEquivalent: ["td"] },
        columnheader: { requiredParent: ["row"], nativeHTMLEquivalent: ["th"] },
        gridcell: { requiredParent: ["row"], nativeHTMLEquivalent: ["td"] },
        listitem: { requiredParent: ["list", "directory"], nativeHTMLEquivalent: ["li"] },
        menuitem: { requiredParent: ["group", "menu", "menubar"], nativeHTMLEquivalent: [] },
        menuitemcheckbox: { requiredParent: ["group", "menu", "menubar"], nativeHTMLEquivalent: [] },
        menuitemradio: { requiredParent: ["group", "menu", "menubar"], nativeHTMLEquivalent: [] },
        option: { requiredParent: ["group", "listbox"], nativeHTMLEquivalent: ["option"] },
        row: { requiredParent: ["grid", "rowgroup", "table", "treegrid"], nativeHTMLEquivalent: ["tr"] },
        rowgroup: { requiredParent: ["grid", "table", "treegrid"], nativeHTMLEquivalent: ["tbody", "tfoot", "thead"] },
        tab: { requiredParent: ["tablist"], nativeHTMLEquivalent: [] },
        treeitem: { requiredParent: ["group", "tree"], nativeHTMLEquivalent: [] }
    };

    const ariaRoleRequiredParent = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const ariaRoleRequiredParentList = ${JSON.stringify(ariaRoleRequiredParentList)};

        return Array.from(document.querySelectorAll(Object.keys(ariaRoleRequiredParentList).map(role => \`[role='\${role}']\`).join(", ")))
            .map(element => {
                const role = element.getAttribute("role");
                const requiredParents = ariaRoleRequiredParentList[role];
                if (!requiredParents) return null;

                if (Array.isArray(requiredParents.nativeHTMLEquivalent) && requiredParents.nativeHTMLEquivalent.includes(element.tagName.toLowerCase())) {
                    return null;
                }

                const hasRequiredParent = requiredParents.requiredParent.some(parentRole =>
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
            helperText: `The element with role is missing a required parent with one of the following roles: ${element.missingParents.requiredParent.join(", ")}.`,
        });
    });
}