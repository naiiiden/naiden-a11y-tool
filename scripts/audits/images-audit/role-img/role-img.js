import { imageErrors } from "../../../errors/images.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasRoleImg(auditResults) {
    const roleImg = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('[role="img"]:not(svg[role="img"])'))
            .filter(img => {
                const ariaLabel = img.hasAttribute('aria-label') ? img.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = img.hasAttribute('aria-labelledby') 
                    ? document.getElementById(img.getAttribute('aria-labelledby')) 
                    : null;
                const title = img.hasAttribute('title') ? img.getAttribute('title').trim() : null;

                return !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
            })
            .map(img => ({
                outerHTML: img.outerHTML,
                selector: getUniqueSelector(img)
            }));
    `);

    roleImg.forEach(img => {
        auditResults.push({ 
            ...imageErrors[5], 
            element: img.outerHTML,
            selector: img.selector
        });
    });
}