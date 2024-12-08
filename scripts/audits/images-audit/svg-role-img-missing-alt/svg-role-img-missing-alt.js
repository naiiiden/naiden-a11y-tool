import { imageErrors } from "../../../errors/images.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasMissingAltImages(auditResults) {
    const missingAltImages = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('svg[role="img"]'))
            .filter(img => {
                const alt = img.getAttribute('alt');
                const ariaLabel = img.hasAttribute('aria-label') ? img.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = img.hasAttribute('aria-labelledby') 
                    ? document.getElementById(img.getAttribute('aria-labelledby')) 
                    : null;

                return alt === null && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim())) && (!role || (role !== 'none' && role !== 'presentation'));
            })
            .map(img => ({
                outerHTML: img.outerHTML,
                selector: getUniqueSelector(img)
            }));
    `);
  
    missingAltImages.forEach(img => {
        auditResults.push({ 
            ...imageErrors[0],
            element: img.outerHTML,
            selector: img.selector
        });
    });
}