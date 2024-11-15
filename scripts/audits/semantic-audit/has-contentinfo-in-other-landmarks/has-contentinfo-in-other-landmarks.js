import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasContentinfoInOtherLandmarks(auditResults) {
    const contentinfoInOtherLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            :is(header, nav, main, section, form, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
                    :is([role="region"], [role="form"]):is(
                        [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
                    ), 
                    [role="complementary"], [role="contentinfo"], [role="search"])
            :is(footer:not([role]):not(:is(article, aside, main, nav, section) footer:not([role])), [role="contentinfo"])
        \`))
        .map(footer => ({
            outerHTML: footer.outerHTML,
            selector: getUniqueSelector(footer)
        }));
    `);
    
    contentinfoInOtherLandmarks.forEach(footer => {
        auditResults.push({
            ...semanticErrors[11],
            element: footer.outerHTML,
            selector: footer.selector
        });
    });
}