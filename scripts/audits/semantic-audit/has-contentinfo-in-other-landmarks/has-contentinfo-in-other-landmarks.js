import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasContentinfoInOtherLandmarks() {
  return Array.from(
    document.querySelectorAll(`
        :is(header, nav, main, section, form, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
                :is([role="region"], [role="form"]):is(
                    [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
                ), 
                [role="complementary"], [role="contentinfo"], [role="search"])
        :is(footer:not([role]):not(:is(article, aside, main, nav, section) footer:not([role])), [role="contentinfo"])
    `),
  )
    .filter((footer) => isElementVisible(footer))
    .map((footer) => ({
      outerHTML: footer.outerHTML,
      selector: getUniqueSelector(footer),
    }));
}

export async function hasContentinfoInOtherLandmarksEval(auditResults) {
  const contentinfoInOtherLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasContentinfoInOtherLandmarks = ${hasContentinfoInOtherLandmarks.toString()};

        return hasContentinfoInOtherLandmarks();
    `);

  contentinfoInOtherLandmarks.forEach((footer) => {
    auditResults.push({
      ...semanticErrors[11],
      element: footer.outerHTML,
      selector: footer.selector,
    });
  });
}
