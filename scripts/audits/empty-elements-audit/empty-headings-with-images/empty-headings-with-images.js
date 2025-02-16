import { emptyElementsErrors } from "../../../errors/empty-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasEmptyHeadingsWithImages(auditResults) {
    const emptyHeadingsWithImages = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(':is(h1, h2, h3, h4, h5, h6):has(img)'))
            .map(heading => {
                const textContent = heading.innerText.trim();
                const img = heading.querySelector('img');
                const imgAlt = img ? img.getAttribute('alt') : null;
                return {
                    hasText: textContent.length > 0,
                    hasImage: img !== null,
                    hasImageAlt: imgAlt !== null && imgAlt.trim() !== "",
                    outerHTML: heading.outerHTML,
                    selector: getUniqueSelector(heading)
                };
            });
    `)
      
    emptyHeadingsWithImages.forEach(heading => {
        if (!heading.hasText && heading.hasImage && !heading.hasImageAlt) {
            auditResults.push({ ...emptyElementsErrors[0], element: heading.outerHTML, selector: heading.selector });
        }
    });
}