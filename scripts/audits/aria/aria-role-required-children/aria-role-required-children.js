import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

// prettier-ignore
export const ariaRoleRequiredChildrenList = {
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

export function hasAriaRoleRequiredChildren() {
  return Array.from(
    document.querySelectorAll(
      Object.keys(ariaRoleRequiredChildrenList)
        .map((role) => `[role='${role}']`)
        .join(", "),
    ),
  )
    .filter((element) => isElementVisible(element))
    .map((element) => {
      const role = element.getAttribute("role");
      const roleData = ariaRoleRequiredChildrenList[role];
      if (!roleData) return null;

      const hasRequiredChildrenWithRole = roleData.requiredChildrenWithRole.some(
        (childRole) =>
          Array.from(element.querySelectorAll(`[role='${childRole}']`)).some((child) =>
            isElementVisible(child),
          ),
      );

      const hasRequiredChildrenWithRoleNativeHtmlEquivalent =
        roleData.requiredChildrenWithRoleNativeHtmlEquivalent.some((selector) =>
          Array.from(element.querySelectorAll(selector)).some((child) =>
            isElementVisible(child),
          ),
        );

      if (
        !hasRequiredChildrenWithRole &&
        !hasRequiredChildrenWithRoleNativeHtmlEquivalent
      ) {
        return {
          outerHTML: element.outerHTML,
          selector: getUniqueSelector(element),
          missingChildren: roleData,
        };
      }

      return null;
    })
    .filter((result) => result !== null);
}

export async function hasAriaRoleRequiredChildrenEval(auditResults) {
  const ariaRoleRequiredChildren = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const ariaRoleRequiredChildrenList = ${JSON.stringify(ariaRoleRequiredChildrenList)};
    const hasAriaRoleRequiredChildren = ${hasAriaRoleRequiredChildren.toString()};

    return hasAriaRoleRequiredChildren();
  `);

  ariaRoleRequiredChildren.forEach((element) => {
    auditResults.push({
      ...ariaErrors[18],
      element: element.outerHTML,
      selector: element.selector,
      helperText: `The element with role is missing required children with the following roles: ${element.missingChildren.requiredChildrenWithRole.join(", ")}.`,
    });
  });
}
