import { imageLinkAndButtonErrors } from "./errors.js";
import { getUniqueSelector, inspectedWindowEval } from "./utils.js";

export async function imageLinkAndButtonAudit(auditResults) {
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
            ...imageLinkAndButtonErrors[0],
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
                ...imageLinkAndButtonErrors[0], 
                element: img.outerHTML, 
                selector: img.selector 
            });
        } else if (!img.hasText && (!img.alt || img.alt === "")) {
            auditResults.push({ 
                ...imageLinkAndButtonErrors[1], 
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
                ...imageLinkAndButtonErrors[0], 
                element: img.outerHTML,
                selector: img.selector
            }); 
        } else if (!img.hasText && (!img.alt || img.alt === "")) {
            auditResults.push({ 
                ...imageLinkAndButtonErrors[2], 
                element: img.outerHTML,
                selector: img.selector
            });
        }
    });

    const emptyLinks = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll('a:not(:has(img):empty'))
          .map(link => ({
              outerHTML: link.outerHTML,
              selector: getUniqueSelector(link)
          }));
    `) 

    emptyLinks.forEach(link => {
        auditResults.push({ ...imageLinkAndButtonErrors[3], element: link.outerHTML, selector: link.selector });
    });

    const emptyButtons = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll(':is([role="button"], button):not(:has(img):empty'))
        .filter(button => {
            const ariaLabel = button.hasAttribute('aria-label') ? button.getAttribute('aria-label').trim() : null;
            const ariaLabelledby = button.hasAttribute('aria-labelledby') 
              ? document.getElementById(button.getAttribute('aria-labelledby')) 
              : null;
            const title = button.hasAttribute('title') ? button.getAttribute('title').trim() : null;
            
            return !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
        })
        .map(button => ({
            outerHTML: button.outerHTML,
            selector: getUniqueSelector(button)
        }));
  `);
  
    emptyButtons.forEach(button => {
        auditResults.push({ ...imageLinkAndButtonErrors[4], element: button.outerHTML, selector: button.selector });
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
                ...imageLinkAndButtonErrors[5],
                element: map.imgOuterHTML,
                selector: map.imgSelector
            });
        }
        
        map.areas.forEach(area => {
            auditResults.push({
                ...imageLinkAndButtonErrors[6],
                element: area.areaOuterHTML,
                selector: area.areaSelector
            });
        });
    });

    const brokenSkipLinks = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll('a[href^="#"]')).map(link => {
        const linkText = link.innerText.toLowerCase();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const isHidden = window.getComputedStyle(link).display === "none" || window.getComputedStyle(link).visibility === "hidden";
        
        return {
          linkText,
          targetExists: !!targetElement,
          isHidden,
          linkOuterHTML: link.outerHTML,
          linkSelector: getUniqueSelector(link)
        };
      });
    `) 
    
    brokenSkipLinks
      .filter(link => (link.linkText.includes('skip') || link.linkText.includes('jump')) && (!link.targetExists || link.isHidden))
      .forEach(link => {
        auditResults.push({
          ...imageLinkAndButtonErrors[7],
          element: link.linkOuterHTML,
          selector: link.linkSelector
        });
    });

    const interactiveControlsWithInteractiveControlsAsChildren = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll(':is(button, a, [role="button"], [role="link"]):has(a, button, [role="button"], [role="link"], input, [tabindex], textarea, select)'))
        .map(element => {
          return {
            outerHTML: element.outerHTML,
            selector: getUniqueSelector(element)
          };
        });
    `) 
    
    interactiveControlsWithInteractiveControlsAsChildren.forEach((element) => {
          auditResults.push({
            ...imageLinkAndButtonErrors[8],
            element: element.outerHTML,
            selector: element.selector
          });
    });

    const brokenSamePageLinks = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll('a[href^="#"]'))
        .filter(link => {
          const linkText = link.innerText.toLowerCase();
          return !(linkText.includes('jump') || linkText.includes('skip'));
        })
        .map(link => {
          const targetId = link.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          return {
            targetExists: !!targetElement,
            outerHTML: link.outerHTML,
            selector: getUniqueSelector(link)
          };
        });
    `) 
    
    brokenSamePageLinks
      .filter(link => !link.targetExists)
      .forEach(link => {
        auditResults.push({
          ...imageLinkAndButtonErrors[9],
          element: link.outerHTML,
          selector: link.selector
        });
    });
}