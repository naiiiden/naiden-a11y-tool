import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasInvalidDlElements(auditResults) {
    const invalidDlElements = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const dlElements = Array.from(document.querySelectorAll('dl'));

        const isDlValid = (dl) => {
            const validChildTags = ['DT', 'DD', 'DIV', 'SCRIPT', 'TEMPLATE'];
            let isValid = true;
            let lastTag = null;

            const validateChildren = (children) => {
                for (let child of children) {
                    const tagName = child.tagName;

                    if (tagName === 'DIV') {
                        isValid = validateChildren(Array.from(child.children));
                        if (!isValid) return false;
                        continue;
                    }

                    if (!validChildTags.includes(tagName)) {
                        isValid = false;
                        return false;
                    }

                    if (tagName === 'DT') {
                        if (lastTag === 'DT') {
                            isValid = false;
                            return false;
                        }
                        lastTag = 'DT';
                    } else if (tagName === 'DD') {
                        if (lastTag !== 'DT') {
                            isValid = false;
                            return false;
                        }
                        lastTag = 'DD';
                    }
                }
                return true;
            };

            return validateChildren(Array.from(dl.children));
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
            selector: element.selector,
            message: "Invalid <dl> structure detected. Ensure <dt> and <dd> elements are properly ordered and not nested inside <div> or other containers."
        });
    });
}