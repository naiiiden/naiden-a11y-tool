import { imageLinkAndButtonErrors } from "./errors.js";

export async function imageLinkAndButtonAudit(auditResults) {
    const missingAltImages = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          Array.from(document.querySelectorAll('img:not(a img):not(button img)')).map((img) => {
            return { alt: img.getAttribute('alt') };
          });
        `, resolve);
    });

    missingAltImages.filter(img => img.alt === null).forEach(() => {
        auditResults.push(imageLinkAndButtonErrors[0]);
    });

    const linkedImages = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('a img')).map((img) => {
            const parentText = img.closest('a').innerText.trim();
            return { alt: img.getAttribute('alt'), hasText: parentText.length > 0 };
            });
        `, resolve);
    });

    linkedImages.forEach((img) => {
        if (img.hasText && img.alt === null) {
            auditResults.push(imageLinkAndButtonErrors[0]);
        } else if (!img.hasText && (!img.alt || img.alt === "")) {
            auditResults.push(imageLinkAndButtonErrors[1]);
        }
    });

    const buttonImages = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('button img')).map((img) => {
            const parentText = img.closest('button').innerText.trim();
            return { alt: img.getAttribute('alt'), hasText: parentText.length > 0 };
            });
        `, resolve);
    });

    buttonImages.forEach((img) => {
        if (img.hasText && img.alt === null) {
            auditResults.push(imageLinkAndButtonErrors[0]); 
        } else if (!img.hasText && (!img.alt || img.alt === "")) {
            auditResults.push(imageLinkAndButtonErrors[2]);
        }
    });

    const emptyLinks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('a:not(:has(img)')).filter(link => !link.innerText.trim()).map(link => link.outerHTML);
        `, resolve);
    });

    emptyLinks.forEach(() => {
        auditResults.push(imageLinkAndButtonErrors[3]);
    });

    const emptyButtons = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('button:not(:has(img)')).filter(button => !button.innerText.trim()).map(button => button.outerHTML);
        `, resolve);
    });

    emptyButtons.forEach(() => {
        auditResults.push(imageLinkAndButtonErrors[4]);
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

    const skipLinks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('a')).map(link => {
                const linkText = link.innerText.toLowerCase();
                const href = link.getAttribute('href');
                return { text: linkText, href: href };
            });
        `, resolve);
    });

    for (const link of skipLinks) {
        if (link.text.includes("skip") || link.text.includes("jump")) {
            if (link.href && link.href.startsWith("#")) {
                const targetId = link.href.substring(1);
                const targetExists = await new Promise((resolve) => {
                    chrome.devtools.inspectedWindow.eval(`
                        document.getElementById('${targetId}') || document.querySelector('a[name="${targetId}"]')
                    `, resolve);
                });

                if (!targetExists) {
                    auditResults.push(imageLinkAndButtonErrors[7]);
                }
            }
        }
    }
}