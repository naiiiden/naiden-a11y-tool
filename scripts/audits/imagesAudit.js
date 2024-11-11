import { imageErrors } from "../errors/images.js";
import { getUniqueSelector } from "../utils/getUniqueSelector.js";
import { inspectedWindowEval } from "../utils/inspectedWindowEval.js";

export async function imagesAudit(auditResults) {
    const missingAltImages = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll('img:not(a img):not(button img)'))
        .filter(img => {
            const alt = img.getAttribute('alt');
            const ariaLabel = img.hasAttribute('aria-label') ? img.getAttribute('aria-label').trim() : null;
            const ariaLabelledby = img.hasAttribute('aria-labelledby') 
                ? document.getElementById(img.getAttribute('aria-labelledby')) 
                : null;

            return alt === null && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()));
        })
        .map(img => ({
            outerHTML: img.outerHTML,
            selector: getUniqueSelector(img)
        }));
    `);

    missingAltImages.forEach(img => {
        auditResults.push({ 
            ...imageErrors[0],
            element: img.outerHTML,
            selector: img.selector
        });
    });

    const linkedImages = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll('a img'))
          .map((img) => {
              const parentText = img.closest('a').innerText.trim();
              return { 
                  alt: img.getAttribute('alt'), 
                  hasText: parentText.length > 0, 
                  outerHTML: img.outerHTML,
                  selector: getUniqueSelector(img)
              };
          });
    `) 

    linkedImages.forEach((img) => {
        if (img.hasText && img.alt === null) {
            auditResults.push({ 
                ...imageErrors[0], 
                element: img.outerHTML, 
                selector: img.selector 
            });
        } else if (!img.hasText && (!img.alt || img.alt === "")) {
            auditResults.push({ 
                ...imageErrors[1], 
                element: img.outerHTML, 
                selector: img.selector 
            });
        }
    });

    const buttonImages = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll('button img'))
          .map((img) => {
              const parentText = img.closest('button').innerText.trim();
              return { 
                  alt: img.getAttribute('alt'), 
                  hasText: parentText.length > 0,
                  outerHTML: img.outerHTML,
                  selector: getUniqueSelector(img)
              };
          });
    `) 

    buttonImages.forEach((img) => {
        if (img.hasText && img.alt === null) {
            auditResults.push({ 
                ...imageErrors[0], 
                element: img.outerHTML,
                selector: img.selector
            }); 
        } else if (!img.hasText && (!img.alt || img.alt === "")) {
            auditResults.push({ 
                ...imageErrors[2], 
                element: img.outerHTML,
                selector: img.selector
            });
        }
    });

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

    const roleImg = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('[role="img"]'))
            .filter(img => {
                const ariaLabel = img.hasAttribute('aria-label') ? img.getAttribute('aria-label').trim() : null;
                const ariaLabelledby = img.hasAttribute('aria-labelledby') 
                    ? document.getElementById(img.getAttribute('aria-labelledby')) 
                    : null;
                const title = img.hasAttribute('title') ? img.getAttribute('title').trim() : null;

                return !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
            })
            .map(img => ({
                outerHTML: img.outerHTML,
                selector: getUniqueSelector(img)
            }));
    `);

    roleImg.forEach(img => {
        auditResults.push({ 
            ...imageErrors[5], 
            element: img.outerHTML,
            selector: img.selector
        });
    });
}