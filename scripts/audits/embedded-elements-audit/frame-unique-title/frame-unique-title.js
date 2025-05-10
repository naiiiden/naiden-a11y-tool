import { embeddedElementsErrors } from "../../../errors/embedded-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasFrameUniqueTitles() {
  const titleMap = new Map();
  return Array.from(document.querySelectorAll("iframe"))
    .filter((iframe) => isElementVisible(iframe))
    .map((iframe) => {
      const title = iframe.hasAttribute("title")
        ? iframe.getAttribute("title").trim()
        : null;

      if (!title) return null;

      const selector = getUniqueSelector(iframe);

      if (titleMap.has(title)) {
        titleMap.get(title).push(selector);
        return {
          element: iframe.outerHTML,
          selector,
        };
      }

      titleMap.set(title, [selector]);

      return null;
    })
    .filter((issue) => issue !== null);
}

export async function hasFrameUniqueTitlesEval(auditResults) {
  const frameUniqueTitles = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasFrameUniqueTitles = ${hasFrameUniqueTitles.toString()};

    return hasFrameUniqueTitles();
  `);

  frameUniqueTitles.forEach((element) => {
    auditResults.push({
      ...embeddedElementsErrors[2],
      element: element.element,
      selector: element.selector,
    });
  });
}
