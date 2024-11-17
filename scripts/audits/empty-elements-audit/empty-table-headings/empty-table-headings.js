import { emptyErrors } from "../../../errors/empty-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasEmptyTableHeadings(auditResults) {
    const emptyTableHeadings = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("th"))
            .filter(tableHeading => {
                return tableHeading.innerText.trim() === "";
            })
            .map(tableHeading => ({
                outerHTML: tableHeading.outerHTML,
                selector: getUniqueSelector(tableHeading)
            }));
    `)
      
    emptyTableHeadings.forEach(tableHeading => {
        auditResults.push({ ...emptyErrors[1], element: tableHeading.outerHTML, selector: tableHeading.selector });
    });
}