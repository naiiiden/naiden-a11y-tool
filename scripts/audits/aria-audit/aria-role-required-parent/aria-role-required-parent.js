import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaRoleRequiredParent(auditResults) {
    const ariaRoleRequiredParentList = {
        caption: { requiredParent: ["figure", "grid", "table", "treegrid"], nativeHtmlEquivalent: [] },
        cell: { requiredParent: ["row"], nativeHtmlEquivalent: ["td"] },
        columnheader: { requiredParent: ["row"], nativeHtmlEquivalent: ["th"] },
        gridcell: { requiredParent: ["row"], nativeHtmlEquivalent: ["td"] },
        listitem: { requiredParent: ["list", "directory"], nativeHtmlEquivalent: ["li"] },
        menuitem: { requiredParent: ["group", "menu", "menubar"], nativeHtmlEquivalent: [] },
        menuitemcheckbox: { requiredParent: ["group", "menu", "menubar"], nativeHtmlEquivalent: [] },
        menuitemradio: { requiredParent: ["group", "menu", "menubar"], nativeHtmlEquivalent: [] },
        option: { requiredParent: ["group", "listbox"], nativeHtmlEquivalent: ["option"] },
        row: { requiredParent: ["grid", "rowgroup", "table", "treegrid"], nativeHtmlEquivalent: ["tr"] },
        rowgroup: { requiredParent: ["grid", "table", "treegrid"], nativeHtmlEquivalent: ["tbody", "tfoot", "thead"] },
        tab: { requiredParent: ["tablist"], nativeHtmlEquivalent: [] },
        treeitem: { requiredParent: ["group", "tree"], nativeHtmlEquivalent: [] }
    };

    const ariaRoleRequiredParent = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const ariaRoleRequiredParentList = ${JSON.stringify(ariaRoleRequiredParentList)};

        return Array.from(document.querySelectorAll(Object.keys(ariaRoleRequiredParentList).map(role => \`[role='\${role}']\`).join(", ")))
            .map(element => {
                const role = element.getAttribute("role");
                const requiredParents = ariaRoleRequiredParentList[role];
                if (!requiredParents) return null;
                
                const hasRequiredParent = requiredParents.requiredParent.some(parentRole =>
                    element.closest(\`[role='\${parentRole}']\`)
                );

                if (Array.isArray(requiredParents.nativeHtmlEquivalent) && requiredParents.nativeHtmlEquivalent.includes(element.tagName.toLowerCase())) {
                    return null;
                }

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