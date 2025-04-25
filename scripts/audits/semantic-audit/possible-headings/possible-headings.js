import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasPossibleHeadings(auditResults) {
    const possibleHeadings = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('p'))
            .filter(p => p.textContent.trim().length < 50)
                .filter(p => {
                    const style = window.getComputedStyle(p);
                    const fontSize = parseFloat(style.fontSize);
                    const isBold = style.fontWeight === 'bold' || parseInt(style.fontWeight) >= 600;
                    const isItalic = style.fontStyle === 'italic';

                    return fontSize >= 20 || (fontSize >= 16 && (isBold || isItalic));
            })
            .map(p => ({
                outerHTML: p.outerHTML,
                selector: getUniqueSelector(p)
            }));
    `) 
    
    possibleHeadings.forEach(heading => {
        auditResults.push({
            ...semanticErrors[2],
            element: heading.outerHTML,
            selector: heading.selector
        });
    });
}