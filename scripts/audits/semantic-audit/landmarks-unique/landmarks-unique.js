import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasUniqueLandmarks() {
  const seenLandmarks = new Map();
  return Array.from(
    document.querySelectorAll(
      'header, footer, main, nav, article, aside section, form, [role="banner"], [role="main"], [role="complementary"], [role="contentinfo"], [role="region"], [role="search"], [role="article"], [role="navigation"], [role="form"]',
    ),
  )
    .filter((element) => {
      if (!isElementVisible(element)) {
        return false;
      }

      const role = element.getAttribute("role") || element.tagName.toLowerCase();

      const name =
        element.getAttribute("aria-label") ||
        (element.hasAttribute("aria-labelledby")
          ? Array.from(element.getAttribute("aria-labelledby").split(" "))
              .map((id) => document.getElementById(id)?.textContent?.trim())
              .filter(Boolean)
              .join(" ")
          : null) ||
        element.getAttribute("title") ||
        null;

      const key = role + "|" + name;

      if (seenLandmarks.has(key)) {
        return true;
      } else {
        seenLandmarks.set(key, getUniqueSelector(element));
        return false;
      }
    })
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasUniqueLandmarksEval(auditResults) {
  const uniqueLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasUniqueLandmarks = ${hasUniqueLandmarks.toString()};

        return hasUniqueLandmarks();
    `);

  uniqueLandmarks.forEach((element) => {
    auditResults.push({
      ...semanticErrors[21],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
