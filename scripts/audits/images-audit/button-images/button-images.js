import { imageErrors } from "../../../errors/images.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasButtonImages() {
  return Array.from(document.querySelectorAll("button img"))
    .filter((img) => isElementVisible(img))
    .map((img) => {
      const parentText = img.closest("button").textContent.trim();
      return {
        alt: img.getAttribute("alt"),
        hasText: parentText.length > 0,
        outerHTML: img.outerHTML,
        selector: getUniqueSelector(img),
      };
    });
}

export async function hasButtonImagesEval(auditResults) {
  const buttonImages = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasButtonImages = ${hasButtonImages.toString()};

    return hasButtonImages();
  `);

  buttonImages.forEach((img) => {
    if (img.hasText && img.alt === null) {
      auditResults.push({
        ...imageErrors[0],
        element: img.outerHTML,
        selector: img.selector,
      });
    } else if (!img.hasText && (!img.alt || img.alt === "")) {
      auditResults.push({
        ...imageErrors[2],
        element: img.outerHTML,
        selector: img.selector,
      });
    }
  });
}
