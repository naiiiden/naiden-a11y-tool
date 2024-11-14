import { imageErrors } from "../../../errors/images.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasButtonImages(auditResults) {
    const buttonImages = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('button img'))
            .map((img) => {
                const parentText = img.closest('button').innerText.trim();
                return { 
                    alt: img.getAttribute('alt'), 
                    hasText: parentText.length > 0,
                    outerHTML: img.outerHTML,
                    selector: getUniqueSelector(img)
                };
            });
    `) 
  
    buttonImages.forEach((img) => {
        if (img.hasText && img.alt === null) {
            auditResults.push({ 
                ...imageErrors[0], 
                element: img.outerHTML,
                selector: img.selector
            }); 
        } else if (!img.hasText && (!img.alt || img.alt === "")) {
            auditResults.push({ 
                ...imageErrors[2], 
                element: img.outerHTML,
                selector: img.selector
            });
        }
    });
}