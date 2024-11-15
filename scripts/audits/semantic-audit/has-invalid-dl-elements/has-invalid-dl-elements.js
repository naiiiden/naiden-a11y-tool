import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasInvalidDlElements(auditResults) {
    const invalidDlElements = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const dlElements = Array.from(document.querySelectorAll('dl'));
        
        const isDlValid = (dl) => {
            const validChildTags = ['DT', 'DD', 'DIV', 'SCRIPT', 'TEMPLATE'];
            const children = Array.from(dl.children);
            
            let lastTag = null;
            for (let child of children) {
                const tagName = child.tagName;
    
                if (!validChildTags.includes(tagName)) {
                    return false;
                }
    
                if (tagName === 'DT') {
                    if (lastTag === 'DT') {
                        return false;
                    }
                    lastTag = 'DT';
                } else if (tagName === 'DD') {
                    if (lastTag !== 'DT') {
                        return false; 
                    }
                    lastTag = 'DD';
                }
            }
    
            return true;
        };
        
        return dlElements
            .filter(dl => !isDlValid(dl))
            .map(dl => ({
                outerHTML: dl.outerHTML,
                selector: getUniqueSelector(dl)
            }));
    `) 
    
    invalidDlElements.forEach((element) => {
        auditResults.push({
            ...semanticErrors[16],
            element: element.outerHTML,
            selector: element.selector
        });
    });
}