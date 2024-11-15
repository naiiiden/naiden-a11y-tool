import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasHeadingLevels(auditResults) {
    const headingLevels = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]')).map(heading => {
            let level;
        
            if (heading.hasAttribute('role') && heading.getAttribute('role') === 'heading') {
                const ariaLevel = heading.getAttribute('aria-level');
                if (ariaLevel && !isNaN(ariaLevel)) {
                    level = parseInt(ariaLevel, 10);
                } else {
                    level = 2;
                }
            } else {
                level = parseInt(heading.tagName[1], 10);
            }
        
            return {
                level,
                tagName: heading.tagName,
                outerHTML: heading.outerHTML,
                selector: getUniqueSelector(heading)
            };
        });
    `);
      
    if (headingLevels.length > 0) {
        let previousLevel = 1;
      
        for (const heading of headingLevels) {
            const currentLevel = heading.level;
      
            if (currentLevel > previousLevel + 1) {
                auditResults.push({
                    ...semanticErrors[1],
                    element: heading.outerHTML,
                    selector: heading.selector
                });
                break;
            }
        
            if (currentLevel > previousLevel) {
                previousLevel = currentLevel;
            }
        }
    }
}