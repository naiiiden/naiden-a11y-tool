import { imageErrors } from "../../../errors/images.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasRedundantImgAlt(auditResults) {
    const hasRedundantImgAlt = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(':is([role="button"], [role="link"], button, a) img'))
            .filter(element => {
                const imgParentText = element.parentElement.textContent.trim();
                const imgAlt = element.hasAttribute('alt') ? element.getAttribute('alt').trim() : null;

                return imgParentText === imgAlt;
            })
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `);
    
    hasRedundantImgAlt.forEach(element => {
        auditResults.push({ ...imageErrors[8], element: element.outerHTML, selector: element.selector });
    });
}