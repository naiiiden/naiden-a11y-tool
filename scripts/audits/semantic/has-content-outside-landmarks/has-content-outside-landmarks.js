import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasContentOutsideLandmarks() {
  // 'body > *:not(:is(header, nav, main, footer, section, aside, form, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="complementary"], [role="search"], :is([role="region"], [role="form"]):is([aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])), style, script))',
  return Array.from(
    document.querySelectorAll(`
      body > *:not(
        header,
        nav,
        main,
        footer,
        section,
        aside,
        form,
        [role="banner"],
        [role="navigation"],
        [role="main"],
        [role="contentinfo"],
        [role="complementary"],
        [role="search"],
        [role="region"],
        [role="region"],
        [role="region"],
        [role="form"],
        [role="form"],
        [role="form"],
        style,
        script
      )
    `),
  )
    .filter((el) => {
      if (!isElementVisible(el)) {
        return false;
      }

      if (el.matches('a[href^="#"]')) {
        const text = el.textContent.toLowerCase();
        if (text.includes("skip") || text.includes("jump")) {
          return false;
        };
      }

      const ariaLabel = el.hasAttribute("aria-label")
        ? el.getAttribute("aria-label").trim()
        : null;
      const ariaLabelledby = el.hasAttribute("aria-labelledby")
        ? document.getElementById(el.getAttribute("aria-labelledby"))
        : null;
      const title = el.hasAttribute("title")
        ? el.getAttribute("title").trim()
        : null;

      return (
        el.textContent.trim() === "" &&
        !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title)
      );
    })
    .map((el) => ({
      outerHTML: el.outerHTML,
      selector: getUniqueSelector(el),
    }));
}

export async function hasContentOutsideLandmarksEval(auditResults) {
  const contentOutsideLandmarks = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasContentOutsideLandmarks = ${hasContentOutsideLandmarks.toString()};

    return hasContentOutsideLandmarks();
  `);

  contentOutsideLandmarks.forEach((element) => {
    auditResults.push({
      ...semanticErrors[13],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
