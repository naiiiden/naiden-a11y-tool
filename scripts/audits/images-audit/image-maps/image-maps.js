import { imageErrors } from "../../../errors/images.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasImageMaps(auditResults) {
    const imageMaps = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('img[usemap]')).map((img) => {
            const usemapName = img.getAttribute('usemap').substring(1);
            const mapElement = document.querySelector('map[name="' + usemapName + '"]');
            const areas = mapElement ? Array.from(mapElement.querySelectorAll('area')) : [];

            return {
                imgAlt: img.getAttribute('alt'),
                imgOuterHTML: img.outerHTML,
                imgSelector: getUniqueSelector(img),
                areas: areas.filter(area => {
                    const ariaLabel = area.hasAttribute('aria-label') ? area.getAttribute('aria-label').trim() : null;
                    const ariaLabelledby = area.hasAttribute('aria-labelledby') 
                        ? document.getElementById(area.getAttribute('aria-labelledby')) 
                        : null;
                    const areaAlt = area.getAttribute('alt');
                    return !(areaAlt || ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()));
                }).map(area => ({
                    areaOuterHTML: area.outerHTML,
                    areaSelector: getUniqueSelector(area)
                }))
            };
        });
    `);
    
    imageMaps.forEach(map => {
        if (!map.imgAlt || map.imgAlt === "") {
            auditResults.push({
                ...imageErrors[3],
                element: map.imgOuterHTML,
                selector: map.imgSelector
            });
        }
        
        map.areas.forEach(area => {
            auditResults.push({
                ...imageErrors[4],
                element: area.areaOuterHTML,
                selector: area.areaSelector
            });
        });
    });
}