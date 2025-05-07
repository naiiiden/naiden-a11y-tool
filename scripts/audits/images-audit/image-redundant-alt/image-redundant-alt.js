import { imageErrors } from "../../../errors/images.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasRedundantImgAlt() {
    return Array.from(document.querySelectorAll(':is([role="button"], [role="link"], button, a) img'))
        .filter(element => {
            if (!isElementVisible(element)) {
                return false;
            }
    
            const imgParentText = element.parentElement.textContent.trim().toLowerCase();
            const imgAlt = element.hasAttribute('alt') ? element.getAttribute('alt').trim().toLowerCase() : null;
    
            if (imgParentText !== "" && imgAlt !== "") {
                return imgParentText === imgAlt;
            }
        })
        .map(element => ({
            outerHTML: element.outerHTML,
            selector: getUniqueSelector(element)
        }));
}

export async function hasRedundantImgAltEval(auditResults) {
    const redundantImgAlt = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasRedundantImgAlt = ${hasRedundantImgAlt.toString()};

        return hasRedundantImgAlt();
    `);
    
    redundantImgAlt.forEach(element => {
        auditResults.push({ ...imageErrors[8], element: element.outerHTML, selector: element.selector });
    });
}