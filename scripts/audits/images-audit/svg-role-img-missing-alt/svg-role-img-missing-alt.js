import { imageErrors } from "../../../errors/images.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function hasSvgRoleImgMissingAlt(auditResults) {
    const hasSvgRoleImgMissingAlt = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        
        return Array.from(document.querySelectorAll('svg[role="img"]'))
            .filter(img => {
                if (!isElementVisible(img)) {
                    return false;
                }

                const ariaLabel = img.hasAttribute('aria-label') ? img.getAttribute('aria-label').trim() : null;

                const ariaLabelledby = img.hasAttribute('aria-labelledby')
                    ? document.getElementById(img.getAttribute('aria-labelledby'))
                    : null;
                const ariaLabelledbyText = ariaLabelledby && ariaLabelledby.textContent.trim();

                const titleAttribute = img.hasAttribute('title') ? img.getAttribute('title').trim() : null;
                
                const titleElement = img.querySelector("title");
                const titleElementHasText = titleElement && titleElement.textContent.trim();

                return !(ariaLabel || ariaLabelledbyText || titleAttribute || titleElementHasText);
            })
            .map(img => ({
                outerHTML: img.outerHTML,
                selector: getUniqueSelector(img)
            }));
    `);
  
    hasSvgRoleImgMissingAlt.forEach(img => {
        auditResults.push({ 
            ...imageErrors[7],
            element: img.outerHTML,
            selector: img.selector
        });
    });
}