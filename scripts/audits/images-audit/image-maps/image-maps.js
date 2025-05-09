import { imageErrors } from "../../../errors/images.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasImageMaps() {
  return Array.from(document.querySelectorAll("img[usemap]"))
    .filter((img) => isElementVisible(img))
    .map((img) => {
      const usemapName = img.getAttribute("usemap").substring(1);
      const mapElement = document.querySelector('map[name="' + usemapName + '"]');
      const areas = mapElement ? Array.from(mapElement.querySelectorAll("area")) : [];

      return {
        imgAlt: img.getAttribute("alt"),
        imgOuterHTML: img.outerHTML,
        imgSelector: getUniqueSelector(img),
        areas: areas
          .filter((area) => {
            if (!isElementVisible(area)) {
              return false;
            }

            const ariaLabel = area.hasAttribute("aria-label")
              ? area.getAttribute("aria-label").trim()
              : null;
            const ariaLabelledby = area.hasAttribute("aria-labelledby")
              ? document.getElementById(area.getAttribute("aria-labelledby"))
              : null;
            const areaAlt = area.getAttribute("alt");
            return !(
              areaAlt ||
              ariaLabel ||
              (ariaLabelledby && ariaLabelledby.textContent.trim())
            );
          })
          .map((area) => ({
            areaOuterHTML: area.outerHTML,
            areaSelector: getUniqueSelector(area),
          })),
      };
    });
}

export async function hasImageMapsEval(auditResults) {
  // https://dequeuniversity.com/rules/axe/4.10/area-alt
  const imageMaps = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasImageMaps = ${hasImageMaps.toString()};

        return hasImageMaps();
    `);

  imageMaps.forEach((map) => {
    if (!map.imgAlt || map.imgAlt === "") {
      auditResults.push({
        ...imageErrors[3],
        element: map.imgOuterHTML,
        selector: map.imgSelector,
      });
    }

    map.areas.forEach((area) => {
      auditResults.push({
        ...imageErrors[4],
        element: area.areaOuterHTML,
        selector: area.areaSelector,
      });
    });
  });
}
