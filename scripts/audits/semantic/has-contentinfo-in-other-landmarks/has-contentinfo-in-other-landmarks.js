import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasContentinfoInOtherLandmarks() {
  return Array.from(
    // :is(header, nav, main, section, form, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
    //         :is([role="region"], [role="form"]):is(
    //             [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
    //         ), 
    //         [role="complementary"], [role="contentinfo"], [role="search"])
    // :is(footer:not([role]):not(:is(article, aside, main, nav, section) footer:not([role])), [role="contentinfo"])
    document.querySelectorAll(`
      header footer:not([role]), 
      header [role="contentinfo"], 
      nav [role="contentinfo"],
      main [role="contentinfo"],
      section [role="contentinfo"], 
      form footer:not([role]), 
      form [role="contentinfo"], 
      article [role="contentinfo"], 
      aside [role="contentinfo"],
      footer footer:not([role]), 
      footer [role="contentinfo"],
      [role="banner"] footer:not([role]), 
      [role="banner"] [role="contentinfo"], 
      [role="navigation"] footer:not([role]), 
      [role="navigation"] [role="contentinfo"], 
      [role="main"] footer:not([role]), 
      [role="main"] [role="contentinfo"], 
      [role="complementary"] footer:not([role]), 
      [role="complementary"] [role="contentinfo"],
      [role="contentinfo"] footer:not([role]), 
      [role="contentinfo"] [role="contentinfo"],
      [role="search"] footer:not([role]), 
      [role="search"] [role="contentinfo"], 
      [role="region"]:is([aria-labelledby]:not([aria-labelledby=""])) footer:not([role]), 
      [role="region"]:is([aria-labelledby]:not([aria-labelledby=""])) [role="contentinfo"],
      [role="region"]:is([aria-label]:not([aria-label=""])) footer:not([role]), 
      [role="region"]:is([aria-label]:not([aria-label=""])) [role="contentinfo"], 
      [role="region"]:is([title]:not([title=""])) footer:not([role]), 
      [role="region"]:is([title]:not([title=""])) [role="contentinfo"], 
      [role="form"]:is([aria-labelledby]:not([aria-labelledby=""])) footer:not([role]), 
      [role="form"]:is([aria-labelledby]:not([aria-labelledby=""])) [role="contentinfo"],
      [role="form"]:is([aria-label]:not([aria-label=""])) footer:not([role]), 
      [role="form"]:is([aria-label]:not([aria-label=""])) [role="contentinfo"], 
      [role="form"]:is([title]:not([title=""])) footer:not([role]), 
      [role="form"]:is([title]:not([title=""])) [role="contentinfo"]
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
