import { imageErrors } from "../../../errors/images.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasServerSideImgMaps() {
  return Array.from(document.querySelectorAll('a[href$=".map"]:has(img[ismap])'))
    .filter((img) => isElementVisible(img))
    .map((img) => ({
      outerHTML: img.outerHTML,
      selector: getUniqueSelector(img),
    }));
}

export async function hasServerSideImgMapsEval(auditResults) {
  const serverSideImgMaps = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasServerSideImgMaps = ${hasServerSideImgMaps.toString()};

    return hasServerSideImgMaps();
  `);

  serverSideImgMaps.forEach((button) => {
    auditResults.push({
      ...imageErrors[6],
      element: button.outerHTML,
      selector: button.selector,
    });
  });
}
