import { imageErrors } from "../../../errors/images.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasServerSideImgMaps(auditResults) {
    const hasServerSideImgMaps = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('a[href$=".map"]:has(img[ismap])'))
            .map(button => ({
                outerHTML: button.outerHTML,
                selector: getUniqueSelector(button)
            }));
    `);
    
    hasServerSideImgMaps.forEach(button => {
        auditResults.push({ ...imageErrors[6], element: button.outerHTML, selector: button.selector });
    });
}