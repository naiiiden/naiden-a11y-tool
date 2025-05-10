import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export const ariaRoleRequiredParentList = {
  caption: {
    requiredParent: ["figure", "grid", "table", "treegrid"],
  },
  cell: {
    requiredParent: ["row"],
  },
  columnheader: {
    requiredParent: ["row"],
  },
  gridcell: {
    requiredParent: ["row"],
  },
  listitem: {
    requiredParent: ["list", "directory"],
  },
  menuitem: {
    requiredParent: ["group", "menu", "menubar"],
  },
  menuitemcheckbox: {
    requiredParent: ["group", "menu", "menubar"],
  },
  menuitemradio: {
    requiredParent: ["group", "menu", "menubar"],
  },
  option: {
    requiredParent: ["group", "listbox"],
  },
  row: {
    requiredParent: ["grid", "rowgroup", "table", "treegrid"],
  },
  rowgroup: {
    requiredParent: ["grid", "table", "treegrid"],
  },
  tab: {
    requiredParent: ["tablist"],
  },
  treeitem: {
    requiredParent: ["group", "tree"],
  },
};

export function hasAriaRoleRequiredParent() {
  return Array.from(
    document.querySelectorAll(
      Object.keys(ariaRoleRequiredParentList)
        .map((role) => `[role='${role}']`)
        .join(", "),
    ),
  )
    .filter((element) => isElementVisible(element))
    .map((element) => {
      const role = element.getAttribute("role");
      const roleData = ariaRoleRequiredParentList[role];
      if (!roleData) return null;

      const hasRequiredParent = roleData.requiredParent.some((parentRole) =>
        element.closest(`[role='${parentRole}']`),
      );

      if (!hasRequiredParent) {
        return {
          outerHTML: element.cloneNode().outerHTML,
          selector: getUniqueSelector(element),
          missingParents: roleData,
        };
      }

      return null;
    })
    .filter((result) => result !== null);
}

export async function hasAriaRoleRequiredParentEval(auditResults) {
  const ariaRoleRequiredParent = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const ariaRoleRequiredParentList = ${JSON.stringify(ariaRoleRequiredParentList)};
    const hasAriaRoleRequiredParent = ${hasAriaRoleRequiredParent.toString()};

    return hasAriaRoleRequiredParent();
  `);

  ariaRoleRequiredParent.forEach((element) => {
    auditResults.push({
      ...ariaErrors[19],
      element: element.outerHTML,
      selector: element.selector,
      helperText: `The element with role is missing a required parent with one of the following roles: ${element.missingParents.requiredParent.join(", ")}.`,
    });
  });
}
