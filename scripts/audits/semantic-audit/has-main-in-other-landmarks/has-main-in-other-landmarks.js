import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasMainInOtherLandmarks(auditResults) {
    const mainInOtherLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
          :is(header, nav, main, section, form, article, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
                :is([role="region"], [role="form"]):is(
                    [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
                ), 
                [role="complementary"], [role="contentinfo"], [role="search"]) 
          :is(main:not([role]), [role="main"])
        \`))
            .map(main => ({
                outerHTML: main.outerHTML,
                selector: getUniqueSelector(main)
            }));
    `);
    
    mainInOtherLandmarks.forEach(main => {
        auditResults.push({
            ...semanticErrors[12],
            element: main.outerHTML,
            selector: main.selector
        });
    });
}