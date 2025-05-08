import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasTabindexGreaterThanZero() {
    return Array.from(document.querySelectorAll("[tabindex]:not([tabindex='0'], [tabindex^='-'])"))
        .filter(element => {
            if (!isElementVisible(element)) {
                return false;
            }
    
            const tabindexValue = element.getAttribute("tabindex").trim();
    
            if (!/^\d+(\\s.*)?$/.test(tabindexValue)) {
                return false;
            }
    
            return parseInt(tabindexValue.split(' ')[0], 10) > 0;
        })
        .map(element => ({
            outerHTML: element.outerHTML,
            selector: getUniqueSelector(element)
        }));
}

export async function hasTabindexGreaterThanZeroEval(auditResults) {
    const tabindexGreaterThanZero = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasTabindexGreaterThanZero = ${hasTabindexGreaterThanZero.toString()};

        return hasTabindexGreaterThanZero();
    `) 


    tabindexGreaterThanZero.forEach(element => {
        auditResults.push({
            ...semanticErrors[20],
            element: element.outerHTML,
            selector: element.selector
        });
    });
}