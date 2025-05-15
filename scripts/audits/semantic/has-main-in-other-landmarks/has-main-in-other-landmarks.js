import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasMainInOtherLandmarks() {
  return Array.from(
    // :is(header, nav, main, section, form, article, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
    //       :is([role="region"], [role="form"]):is(
    //           [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
    //       ), 
    //       [role="complementary"], [role="contentinfo"], [role="search"]) 
    // :is(main:not([role]), [role="main"])
    document.querySelectorAll(`
      header main:not([role]), 
      header [role="main"], 
      nav main:not([role]), 
      nav [role="main"],
      main main:not([role]), 
      main [role="main"],
      section main:not([role]), 
      section [role="main"], 
      form main:not([role]), 
      form [role="main"], 
      article main:not([role]), 
      article [role="main"], 
      aside main:not([role]), 
      aside [role="main"],
      footer main:not([role]), 
      footer [role="main"],
      [role="banner"] main:not([role]), 
      [role="banner"] [role="main"], 
      [role="navigation"] main:not([role]), 
      [role="navigation"] [role="main"], 
      [role="main"] main:not([role]), 
      [role="main"] [role="main"], 
      [role="complementary"] main:not([role]), 
      [role="complementary"] [role="main"],
      [role="contentinfo"] main:not([role]), 
      [role="contentinfo"] [role="main"],
      [role="search"] main:not([role]), 
      [role="search"] [role="main"], 
      [role="region"]:is([aria-labelledby]:not([aria-labelledby=""])) main:not([role]), 
      [role="region"]:is([aria-labelledby]:not([aria-labelledby=""])) [role="main"],
      [role="region"]:is([aria-label]:not([aria-label=""])) main:not([role]), 
      [role="region"]:is([aria-label]:not([aria-label=""])) [role="main"], 
      [role="region"]:is([title]:not([title=""])) main:not([role]), 
      [role="region"]:is([title]:not([title=""])) [role="main"], 
      [role="form"]:is([aria-labelledby]:not([aria-labelledby=""])) main:not([role]), 
      [role="form"]:is([aria-labelledby]:not([aria-labelledby=""])) [role="main"],
      [role="form"]:is([aria-label]:not([aria-label=""])) main:not([role]), 
      [role="form"]:is([aria-label]:not([aria-label=""])) [role="main"], 
      [role="form"]:is([title]:not([title=""])) main:not([role]), 
      [role="form"]:is([title]:not([title=""])) [role="main"]
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
