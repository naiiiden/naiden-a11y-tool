import { embeddedElementsErrors } from "../../../errors/embedded-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasVideoCaptions() {
  return Array.from(document.querySelectorAll("video:not(:has(track[kind='captions']))"))
    .filter((element) => isElementVisible(element))
    .map((element) => ({
      outerHTML: element.outerHTML,
      selector: getUniqueSelector(element),
    }));
}

export async function hasVideoCaptionsEval(auditResults) {
  const videoCaptions = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasVideoCaptions = ${hasVideoCaptions.toString()};

    return hasVideoCaptions();
  `);

  videoCaptions.forEach((element) => {
    auditResults.push({
      ...embeddedElementsErrors[4],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
