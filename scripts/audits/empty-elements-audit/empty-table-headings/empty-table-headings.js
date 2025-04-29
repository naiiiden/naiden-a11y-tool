import { emptyElementsErrors } from "../../../errors/empty-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function hasEmptyTableHeadings(auditResults) {
    const emptyTableHeadings = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};

        return Array.from(document.querySelectorAll("th, [role='rowheader'], [role='columnheader']"))
            .filter(tableHeading => {
                if (!isElementVisible(tableHeading)) {
                    return false;
                }
                return tableHeading.textContent.trim() === "";
            })
            .map(tableHeading => ({
                outerHTML: tableHeading.outerHTML,
                selector: getUniqueSelector(tableHeading)
            }));
    `)
      
    emptyTableHeadings.forEach(tableHeading => {
        auditResults.push({ ...emptyElementsErrors[1], element: tableHeading.outerHTML, selector: tableHeading.selector });
    });
}