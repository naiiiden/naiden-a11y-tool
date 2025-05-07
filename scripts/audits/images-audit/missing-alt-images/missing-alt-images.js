import { imageErrors } from "../../../errors/images.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasMissingAltImages() {
    return Array.from(document.querySelectorAll('img:not(a img):not(button img)'))
        .filter(img => {
            if (!isElementVisible(img)) {
                return false;
            }
    
            const alt = img.getAttribute('alt');
            const ariaLabel = img.hasAttribute('aria-label') ? img.getAttribute('aria-label').trim() : null;
            const ariaLabelledby = img.hasAttribute('aria-labelledby') 
                ? document.getElementById(img.getAttribute('aria-labelledby')) 
                : null;
            const role = img.hasAttribute('role') ? img.getAttribute('role').trim() : null;
    
            return alt === null && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim())) && (!role || (role !== 'none' && role !== 'presentation'));
        })
        .map(img => ({
            outerHTML: img.outerHTML,
            selector: getUniqueSelector(img)
        }));
}

export async function hasMissingAltImagesEval(auditResults) {
    const missingAltImages = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasMissingAltImages = ${hasMissingAltImages.toString()};

        return hasMissingAltImages();
    `);
  
    missingAltImages.forEach(img => {
        auditResults.push({ 
            ...imageErrors[0],
            element: img.outerHTML,
            selector: img.selector
        });
    });
}