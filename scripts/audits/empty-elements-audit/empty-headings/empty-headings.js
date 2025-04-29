import { emptyElementsErrors } from "../../../errors/empty-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function hasEmptyHeadings(auditResults) {
    const emptyHeadings = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};

        return Array.from(document.querySelectorAll(":is(h1, h2, h3, h4, h5, h6, [role='heading']):not(:has(img))"))
            .filter(heading => {
                if (!isElementVisible(heading)) {
                    return false;
                }

                const ariaLabel = heading.hasAttribute('aria-label') ? heading.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = heading.hasAttribute('aria-labelledby') 
                    ? document.getElementById(heading.getAttribute('aria-labelledby')) 
                    : null;
                const title = heading.hasAttribute('title') ? heading.getAttribute('title').trim() : null;
                
                return heading.textContent.trim() === "" && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
            })
            .map(heading => ({
                outerHTML: heading.outerHTML,
                selector: getUniqueSelector(heading)
            }));
    `) 
  
    emptyHeadings.forEach(heading => {
        auditResults.push({ ...emptyElementsErrors[0], element: heading.outerHTML, selector: heading.selector });
    });
}