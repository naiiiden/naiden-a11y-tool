import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

// prettier-ignore
export const validAriaRoles = new Set([
    "", "application", "article", "blockquote", "caption", "document", "feed", "group", "heading", "list", "listitem",
    "note", "paragraph", "separator", "toolbar", "code", "definition", "deletion", "emphasis", "figure", "img",
    "insertion", "mark", "math", "meter", "strong", "subscript", "superscript", "term", "time", "tooltip", 
    "banner", "complementary", "contentinfo", "form", "main", "navigation", "region", "search", "alert", "log",
    "marquee", "status", "timer", "none", "generic", "presentation", "cell", "columnheader", "row", "rowgroup",
    "rowheader", "table", "button", "checkbox", "gridcell", "link", "menuitem", "menuitemcheckbox", 
    "menuitemradio", "option", "progressbar", "radio", "scrollbar", "searchbox", "slider", 
    "spinbutton", "switch", "tab", "tabpanel", "textbox", "treeitem", "combobox", "grid", "listbox", "menu", 
    "menubar", "radiogroup", "tablist", "tree", "treegrid", "alertdialog", "dialog", "text", "directory"
]);

export function hasAriaRoleValidValues() {
  return Array.from(document.querySelectorAll("[role]"))
    .filter((element) => isElementVisible(element))
    .filter((element) => !validAriaRoles.has(element.getAttribute("role").trim()))
    .map((element) => ({
      outerHTML: element.cloneNode().outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasAriaRoleValidValuesEval(auditResults) {
  // https://dequeuniversity.com/rules/axe/4.10/aria-roles
  const ariaRoleValidValues = await inspectedWindowEval(`
    const validAriaRoles = new Set(${JSON.stringify(Array.from(validAriaRoles))});
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasAriaRoleValidValues = ${hasAriaRoleValidValues.toString()};

    return hasAriaRoleValidValues();
  `);

  ariaRoleValidValues.forEach((element) => {
    auditResults.push({
      ...ariaErrors[9],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
