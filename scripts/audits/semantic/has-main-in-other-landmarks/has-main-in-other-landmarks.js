import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasMainInOtherLandmarks() {
  return Array.from(
    document.querySelectorAll(`
      :is(header, nav, main, section, form, article, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
            :is([role="region"], [role="form"]):is(
                [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
            ), 
            [role="complementary"], [role="contentinfo"], [role="search"]) 
      :is(main:not([role]), [role="main"])
    `),
  )
    .filter((main) => isElementVisible(main))
    .map((main) => ({
      outerHTML: main.outerHTML,
      selector: getUniqueSelector(main),
    }));
}

export async function hasMainInOtherLandmarksEval(auditResults) {
  const mainInOtherLandmarks = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasMainInOtherLandmarks = ${hasMainInOtherLandmarks.toString()};

    return hasMainInOtherLandmarks();
  `);

  mainInOtherLandmarks.forEach((main) => {
    auditResults.push({
      ...semanticErrors[12],
      element: main.outerHTML,
      selector: main.selector,
    });
  });
}
