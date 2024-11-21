import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function ariaValidAttributeValues(auditResults) {
    const ariaAttributesValidValuesList = {
        "aria-atomic": ["true", "false"],
        "aria-busy": ["true", "false"],
        "aria-current": ["page", "step", "location", "date", "time"],
        "aria-disabled": ["true", "false"],
        "aria-dropeffect": ["copy", "execute", "link", "move", "none", "popup"],
        "aria-grabbed": ["true", "false", "undefined"],
        "aria-haspopup": ["true", "false", "menu", "listbox", "tree", "grid", "dialog"],
        "aria-hidden": ["true", "false", "undefined"],
        "aria-invalid": ["true", "false", "grammar", "spelling"],
        "aria-live": ["off", "assertive", "polite"],
        "aria-relevant": ["additions", "additions text", "all", "removals", "text"],
        "aria-autocomplete": ["inline", "list", "both", "none"],
        "aria-checked": ["true", "false", "mixed", "undefined"],
        "aria-expanded": ["true", "false", "undefined"],
        "aria-modal": ["true", "false"],
        "aria-multiline": ["true", "false"],
        "aria-multiselectable": ["true", "false"],
        "aria-orientation": ["horizontal", "vertical", "undefined"],
        "aria-pressed": ["true", "false", "mixed", "undefined"],
        "aria-readonly": ["true", "false"],
        "aria-required": ["true", "false"],
        "aria-selected": ["true", "false", "undefined"],
        "aria-sort": ["ascending", "descending", "none", "other"]
    }

    // https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr-value
    const ariaAttributesValidValues = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element),
            }));
    `)

    ariaAttributesValidValues.forEach(element => {
        auditResults.push({ ...ariaErrors[14], element: element.outerHTML, selector: element.selector });
    });
}