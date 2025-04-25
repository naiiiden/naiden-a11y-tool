import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasContentOutsideLandmarks(auditResults) {
    const contentOutsideLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('body > *:not(:is(header, nav, main, footer, section, aside, form, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="complementary"], [role="search"], :is([role="region"], [role="form"]):is([aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])), style, script))'))
            .filter(el => {
                if (el.matches('a[href^="#"]')) {
                    const text = el.textContent.toLowerCase();
                    return !(text.includes('skip') || text.includes('jump'));
                }
                return true;
            })    
            .map(el => ({
                outerHTML: el.outerHTML,
                selector: getUniqueSelector(el)
            }));
    `)

    contentOutsideLandmarks.forEach(element => {
        auditResults.push({
            ...semanticErrors[13],
            element: element.outerHTML,
            selector: element.selector
        });
    });
}