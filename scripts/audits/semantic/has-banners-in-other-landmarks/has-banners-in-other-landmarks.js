import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasBannersInOtherLandmarks() {
  // :is(header, nav, main, section, form, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
  //       :is([role="region"], [role="form"]):is(
  //           [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
  //       ), 
  //       [role="complementary"], [role="contentinfo"], [role="search"]) 
  // :is(header:not([role]):not(:is(article, aside, main, nav, section) header:not([role])), [role="banner"])
  return Array.from(
    document.querySelectorAll(`
      header header:not([role]), 
      header [role="banner"], 
      nav [role="banner"],
      main [role="banner"],
      section [role="banner"], 
      form header:not([role]), 
      form [role="banner"], 
      article [role="banner"], 
      aside [role="banner"],
      footer header:not([role]), 
      footer [role="banner"],
      [role="banner"] header:not([role]), 
      [role="banner"] [role="banner"], 
      [role="navigation"] header:not([role]), 
      [role="navigation"] [role="banner"], 
      [role="main"] header:not([role]), 
      [role="main"] [role="banner"], 
      [role="complementary"] header:not([role]), 
      [role="complementary"] [role="banner"],
      [role="contentinfo"] header:not([role]), 
      [role="contentinfo"] [role="banner"],
      [role="search"] header:not([role]), 
      [role="search"] [role="banner"], 
      [role="region"]:is([aria-labelledby]:not([aria-labelledby=""])) header:not([role]), 
      [role="region"]:is([aria-labelledby]:not([aria-labelledby=""])) [role="banner"],
      [role="region"]:is([aria-label]:not([aria-label=""])) header:not([role]), 
      [role="region"]:is([aria-label]:not([aria-label=""])) [role="banner"], 
      [role="region"]:is([title]:not([title=""])) header:not([role]), 
      [role="region"]:is([title]:not([title=""])) [role="banner"], 
      [role="form"]:is([aria-labelledby]:not([aria-labelledby=""])) header:not([role]), 
      [role="form"]:is([aria-labelledby]:not([aria-labelledby=""])) [role="banner"],
      [role="form"]:is([aria-label]:not([aria-label=""])) header:not([role]), 
      [role="form"]:is([aria-label]:not([aria-label=""])) [role="banner"], 
      [role="form"]:is([title]:not([title=""])) header:not([role]), 
      [role="form"]:is([title]:not([title=""])) [role="banner"]
    `),
  )
    .filter((header) => isElementVisible(header))
    .map((header) => ({
      outerHTML: header.outerHTML,
      selector: getUniqueSelector(header),
    }));
}

export async function hasBannersInOtherLandmarksEval(auditResults) {
  const bannersInOtherLandmarks = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasBannersInOtherLandmarks = ${hasBannersInOtherLandmarks.toString()};

    return hasBannersInOtherLandmarks();
  `);

  bannersInOtherLandmarks.forEach((banner) => {
    auditResults.push({
      ...semanticErrors[9],
      element: banner.outerHTML,
      selector: banner.selector,
    });
  });
}
