import { imageErrors } from "../../../errors/images.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasSvgRoleImgMissingAlt(auditResults) {
    const hasSvgRoleImgMissingAlt = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('svg[role="img"]'))
            .filter(img => {
                const ariaLabel = img.hasAttribute('aria-label') ? img.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = img.hasAttribute('aria-labelledby') 
                    ? document.getElementById(img.getAttribute('aria-labelledby')) 
                    : null;
                const title = img.querySelector("title") && img.querySelector("title").textContent.trim();

                return !((ariaLabelledby && ariaLabelledby.textContent.trim()) || ariaLabel || title));
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