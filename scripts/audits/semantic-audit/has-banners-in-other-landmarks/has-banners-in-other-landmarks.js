import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function hasBannersInOtherLandmarks(auditResults) {
    const bannersInOtherLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};

        return Array.from(document.querySelectorAll(\`
          :is(header, nav, main, section, form, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
                :is([role="region"], [role="form"]):is(
                    [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
                ), 
                [role="complementary"], [role="contentinfo"], [role="search"]) 
          :is(header:not([role]):not(:is(article, aside, main, nav, section) header:not([role])), [role="banner"])
        \`))
        .filter(header => isElementVisible(header))
        .map(header => ({
            outerHTML: header.outerHTML,
            selector: getUniqueSelector(header)
        }));
    `) 
    
    bannersInOtherLandmarks.forEach((banner) => {
        auditResults.push({
            ...semanticErrors[9],
            element: banner.outerHTML,
            selector: banner.selector
        });
    });
}