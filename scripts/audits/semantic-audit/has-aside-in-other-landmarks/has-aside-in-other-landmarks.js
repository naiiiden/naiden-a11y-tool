import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasAsideInOtherLandmarks(auditResults) {
    const asidesInOtherLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
          :is(header, nav, main, section, form, article, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
                :is([role="region"], [role="form"]):is(
                    [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
                ), 
                [role="complementary"], [role="contentinfo"], [role="search"]) 
          :is(aside:not([role]), [role="complementary"])
        \`))
        .map(aside => ({
          outerHTML: aside.outerHTML,
          selector: getUniqueSelector(aside)
        }));
    `);

    asidesInOtherLandmarks.forEach(aside => {
        auditResults.push({
            ...semanticErrors[10],
            element: aside.outerHTML,
            selector: aside.selector
        });
    });
}