import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasAsideInOtherLandmarks() {
  // :is(header, nav, main, section, form, article, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
  //       :is([role="region"], [role="form"]):is(
  //           [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
  //       ), 
  //       [role="complementary"], [role="contentinfo"], [role="search"]) 
  // :is(aside:not([role]), [role="complementary"])
  return Array.from(
    document.querySelectorAll(`
      header aside:not([role]), 
      header [role="complementary"], 
      nav aside:not([role]), 
      nav [role="complementary"],
      main aside:not([role]), 
      main [role="complementary"],
      section aside:not([role]), 
      section [role="complementary"], 
      form aside:not([role]), 
      form [role="complementary"], 
      article aside:not([role]), 
      article [role="complementary"], 
      aside aside:not([role]), 
      aside [role="complementary"],
      footer aside:not([role]), 
      footer [role="complementary"],
      [role="banner"] aside:not([role]), 
      [role="banner"] [role="complementary"], 
      [role="navigation"] aside:not([role]), 
      [role="navigation"] [role="complementary"], 
      [role="main"] aside:not([role]), 
      [role="main"] [role="complementary"], 
      [role="complementary"] aside:not([role]), 
      [role="complementary"] [role="complementary"],
      [role="contentinfo"] aside:not([role]), 
      [role="contentinfo"] [role="complementary"],
      [role="search"] aside:not([role]), 
      [role="search"] [role="complementary"], 
      [role="region"]:is([aria-labelledby]:not([aria-labelledby=""])) aside:not([role]), 
      [role="region"]:is([aria-labelledby]:not([aria-labelledby=""])) [role="complementary"],
      [role="region"]:is([aria-label]:not([aria-label=""])) aside:not([role]), 
      [role="region"]:is([aria-label]:not([aria-label=""])) [role="complementary"], 
      [role="region"]:is([title]:not([title=""])) aside:not([role]), 
      [role="region"]:is([title]:not([title=""])) [role="complementary"], 
      [role="form"]:is([aria-labelledby]:not([aria-labelledby=""])) aside:not([role]), 
      [role="form"]:is([aria-labelledby]:not([aria-labelledby=""])) [role="complementary"],
      [role="form"]:is([aria-label]:not([aria-label=""])) aside:not([role]), 
      [role="form"]:is([aria-label]:not([aria-label=""])) [role="complementary"], 
      [role="form"]:is([title]:not([title=""])) aside:not([role]), 
      [role="form"]:is([title]:not([title=""])) [role="complementary"]
    `),
  )
    .filter((aside) => isElementVisible(aside))
    .map((aside) => ({
      outerHTML: aside.outerHTML,
      selector: getUniqueSelector(aside),
    }));
}

export async function hasAsideInOtherLandmarksEval(auditResults) {
  const asidesInOtherLandmarks = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasAsideInOtherLandmarks = ${hasAsideInOtherLandmarks.toString()};

    return hasAsideInOtherLandmarks();
  `);

  asidesInOtherLandmarks.forEach((aside) => {
    auditResults.push({
      ...semanticErrors[10],
      element: aside.outerHTML,
      selector: aside.selector,
    });
  });
}
