import { imageLinkAndButtonErrors } from "./errors.js";
import { getUniqueSelector } from "./utils.js";

export async function imageLinkAndButtonAudit(auditResults) {
    const missingAltImages = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          (() => {
            const getUniqueSelector = ${getUniqueSelector.toString()};
            return Array.from(document.querySelectorAll('img:not(a img):not(button img)'))
              .map((img) => {
                return {
                  alt: img.getAttribute('alt'),
                  outerHTML: img.outerHTML,
                  selector: getUniqueSelector(img)
                };
              });
          })()
        `, resolve);
    });
    
    missingAltImages.filter(img => img.alt === null).forEach(img => {
        auditResults.push({
          ...imageLinkAndButtonErrors[0],
          element: img.outerHTML,
          selector: img.selector
        });
    });

    const linkedImages = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
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
            })()
        `, resolve);
    });

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

    const buttonImages = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
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
            })()
        `, resolve);
    });

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

    const emptyLinks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const getUniqueSelector = ${getUniqueSelector.toString()};
                return Array.from(document.querySelectorAll('a:not(:has(img)'))
                    .filter(link => !link.innerText.trim())
                    .map(link => ({
                        outerHTML: link.outerHTML,
                        selector: getUniqueSelector(link)
                    }));
            })()
        `, resolve);
    });

    emptyLinks.forEach(link => {
        auditResults.push({ ...imageLinkAndButtonErrors[3], element: link.outerHTML, selector: link.selector });
    });

    const emptyButtons = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const getUniqueSelector = ${getUniqueSelector.toString()};
                return Array.from(document.querySelectorAll('button:not(:has(img)'))
                    .filter(button => !button.innerText.trim())
                    .map(button => ({
                        outerHTML:  button.outerHTML,
                        selector: getUniqueSelector(button)
                    }));
            })()
        `, resolve);
    });

    emptyButtons.forEach(button => {
        auditResults.push({ ...imageLinkAndButtonErrors[4], element: button.outerHTML, selector: button.selector });
    });

    const imageMaps = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('img[usemap]')).map((img) => {
            const usemapName = img.getAttribute('usemap').substring(1);
            const mapElement = document.querySelector('map[name="' + usemapName + '"]');
            const areas = mapElement ? Array.from(mapElement.querySelectorAll('area')) : [];
            return {
                imgAlt: img.getAttribute('alt'),
                areas: areas.map(area => area.getAttribute('alt'))
            };
            });
        `, resolve);
    });
    
    imageMaps.forEach(map => {
        if (!map.imgAlt || map.imgAlt === "") {
            auditResults.push(imageLinkAndButtonErrors[5]);
        }
        
        map.areas.forEach(areaAlt => {
            if (!areaAlt || areaAlt === "") {
            auditResults.push(imageLinkAndButtonErrors[6]);
            }
        });
    });

    const brokenSkipLinks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('a[href^="#"]')).map(link => {
                const linkText = link.innerText.toLowerCase();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                const isHidden = window.getComputedStyle(link).display === "none" || window.getComputedStyle(link).visibility === "hidden";
            
                return {
                    linkText,
                    targetExists: !!targetElement,
                    isHidden
                };
            });
        `, resolve);
    });

    brokenSkipLinks
    .filter(link => (link.linkText.includes('skip') || link.linkText.includes('jump')) && (!link.targetExists || link.isHidden))
    .forEach(() => auditResults.push(imageLinkAndButtonErrors[7]));

    const interactiveControlsWithInteractiveControlsAsChildren = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          Array.from(document.querySelectorAll('button, a, [role="button"], [role="link"]'))
            .map(element => {
              const focusableChildren = element.querySelectorAll('button, a, [role="button"], [role="link"], input, select, textarea, [tabindex]');
              return {
                html: element.outerHTML,
                hasFocusableChildren: focusableChildren.length > 0
              };
            })
        `, resolve);
    });
    
    interactiveControlsWithInteractiveControlsAsChildren.forEach((element) => {
        if (element.hasFocusableChildren) {
          auditResults.push(imageLinkAndButtonErrors[8]);
        }
    });

    const brokenSamePageLinks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('a[href^="#"]')).map(link => {
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
            
                return {
                    targetExists: !!targetElement,
                };
            });
        `, resolve);
    });

    brokenSamePageLinks
    .filter(link => !link.targetExists)
    .forEach(() => auditResults.push(imageLinkAndButtonErrors[9]));
}