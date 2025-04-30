import { imageErrors } from "../../../errors/images.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function hasLinkedImages(auditResults) {
    const linkedImages = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};

        return Array.from(document.querySelectorAll('a img'))
            .filter(img => isElementVisible(img))
            .map((img) => {
                const parentText = img.closest('a').textContent.trim();
                return { 
                    alt: img.getAttribute('alt'), 
                    hasText: parentText.length > 0, 
                    outerHTML: img.outerHTML,
                    selector: getUniqueSelector(img)
                };
            });
    `) 
  
    linkedImages.forEach((img) => {
        if (img.hasText && img.alt === null) {
            auditResults.push({ 
                ...imageErrors[0], 
                element: img.outerHTML, 
                selector: img.selector 
            });
        } else if (!img.hasText && (!img.alt || img.alt === "")) {
            auditResults.push({ 
                ...imageErrors[1], 
                element: img.outerHTML, 
                selector: img.selector 
            });
        }
    });
}