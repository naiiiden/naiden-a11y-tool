import { semanticErrors } from "./errors.js";

export async function semanticAudit(auditResults) {
    const hasH1 = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(
        `document.querySelector('h1') !== null`,
        resolve
        );
    });

    if (!hasH1) {
        auditResults.push(semanticErrors[0]);
    }

    const headingLevels = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(
            `Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(heading => heading.tagName)`,
            resolve
        );
    });

    if (headingLevels.length > 0) {
        let previousLevel = 1;

        for (const heading of headingLevels) {
            const currentLevel = parseInt(heading[1]);

            if (currentLevel > previousLevel + 1) {
                auditResults.push(semanticErrors[1]);
                break;
            }

            if (currentLevel > previousLevel) {
                previousLevel = currentLevel;
            }
        }
    }

    const possibleHeadings = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          Array.from(document.querySelectorAll('p'))
            .filter(p => p.innerText.trim().length < 50)
            .filter(p => {
              const style = window.getComputedStyle(p);
              const fontSize = parseFloat(style.fontSize);
              const isBold = style.fontWeight === 'bold' || parseInt(style.fontWeight) >= 600;
              const isItalic = style.fontStyle === 'italic';
    
              return fontSize >= 20 || (fontSize >= 16 && (isBold || isItalic));
            })
            .map(p => p.outerHTML)
        `, resolve);
      });
    
    possibleHeadings.forEach(() => {
        auditResults.push(semanticErrors[2]);
    });

    const hasHeadings = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
        Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).length > 0
        `, resolve);
    });
    
    if (!hasHeadings) {
        auditResults.push(semanticErrors[3]);
    }

    const hasRegionsOrLandmarks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          document.querySelectorAll('header, nav, main, footer, aside, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="complementary"]').length
        `, resolve);
    });

    if (hasRegionsOrLandmarks < 1) {
        auditResults.push(semanticErrors[4]);
    }

    const mainLandmark = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            document.querySelectorAll("main, [role='main']").length
        `, resolve);
    });

    if (mainLandmark < 1) {
        auditResults.push(semanticErrors[5]);
    } else if (mainLandmark > 1) {
        auditResults.push(semanticErrors[6]);
    }

    const moreThanOneBanner = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            document.querySelectorAll("[role='banner']").length
        `, resolve);
    });

    if (moreThanOneBanner > 1) {
        auditResults.push(semanticErrors[7]);
    } 

    const moreThanOneContentinfo = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            document.querySelectorAll("[role='contentinfo']").length
        `, resolve);
    });

    if (moreThanOneContentinfo > 1) {
        auditResults.push(semanticErrors[8]);
    }

    const bannersInOtherLandmarks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('header, [role="banner"]')).map(header => {
                let parent = header.parentElement;
                while (parent && parent !== document.body) {
                    if (parent.hasAttribute('role') && ['main', 'navigation', 'contentinfo', 'complementary', 'search', 'form', 'region'].includes(parent.getAttribute('role'))) {
                        return header.outerHTML;
                    }
                    parent = parent.parentElement;
                }
                return null;
            }).filter(header => header !== null)
        `, resolve);
    });
      
    bannersInOtherLandmarks.forEach(() => {
        auditResults.push(semanticErrors[9]);
    });

    const asidesInOtherLandmarks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('aside, [role="complementary"]')).map(aside => {
                let parent = aside.parentElement;
                while (parent && parent !== document.body) {
                    if (parent.hasAttribute('role') && ['main', 'navigation', 'contentinfo', 'banner', 'search', 'form', 'region'].includes(parent.getAttribute('role'))) {
                        return aside.outerHTML;
                    }
                    parent = parent.parentElement;
                }
                return null;
            }).filter(aside => aside !== null)
        `, resolve);
    });
    
    asidesInOtherLandmarks.forEach(() => {
        auditResults.push(semanticErrors[10]);
    });

    const contentinfoInOtherLandmarks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('footer, [role="contentinfo"]')).map(footer => {
                let parent = footer.parentElement;
                while (parent && parent !== document.body) {
                    if (parent.hasAttribute('role') && ['main', 'navigation', 'banner', 'complementary', 'search', 'form', 'region'].includes(parent.getAttribute('role'))) {
                        return footer.outerHTML;
                    }
                    parent = parent.parentElement;
                }
                return null;
            }).filter(footer => footer !== null)
        `, resolve);
    });
    
    contentinfoInOtherLandmarks.forEach(() => {
        auditResults.push(semanticErrors[11]);
    });

    const mainInOtherLandmarks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('main, [role="main"]')).map(main => {
                let parent = main.parentElement;
                while (parent && parent !== document.body) {
                    if (parent.hasAttribute('role') && ['contentinfo', 'navigation', 'banner', 'complementary', 'search', 'form', 'region'].includes(parent.getAttribute('role'))) {
                        return main.outerHTML;
                    }
                    parent = parent.parentElement;
                }
                return null;
            }).filter(main => main !== null)
        `, resolve);
    });
    
    mainInOtherLandmarks.forEach(() => {
        auditResults.push(semanticErrors[12]);
    });

    const contentOutsideLandmarks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const landmarkSelectors = 'header, nav, main, footer, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="region"], [role="search"], [role="form"]';
                const landmarkElements = Array.from(document.querySelectorAll(landmarkSelectors));

                const allElements = Array.from(document.body.querySelectorAll(':not(script):not(style)'));

                const elementsOutsideLandmarks = allElements.filter(el => {
                    return !landmarkElements.some(landmark => landmark.contains(el));
                });

                return elementsOutsideLandmarks.filter(el => {
                    if (el.matches('a[href^="#"]')) {
                        const text = el.innerText.toLowerCase();
                        return !(text.includes('skip') || text.includes('jump'));
                    }
                    return true;
                });
            })()
        `, resolve);
    });
    
    contentOutsideLandmarks.forEach(() => {
        auditResults.push(semanticErrors[13]);
    });

    const invalidListContent = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const invalidElements = [];
                const listElements = Array.from(document.querySelectorAll('ul, ol'));
                
                listElements.forEach(list => {
                    const children = Array.from(list.children);
                    children.forEach(child => {
                        if (!['LI', 'SCRIPT', 'TEMPLATE'].includes(child.tagName)) {
                            invalidElements.push(child);
                        }
                    });
                });
                
                return invalidElements;
            })()
        `, resolve);
    });
    
    invalidListContent.forEach(() => {
        auditResults.push(semanticErrors[14]); 
    });

    const liOutsideList = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const liElements = Array.from(document.querySelectorAll('li'));
                
                const invalidLiElements = liElements.filter(li => {
                    const parent = li.parentElement;
                    return !(parent && (parent.tagName === 'UL' || parent.tagName === 'OL'));
                });
                
                return invalidLiElements;
            })()
        `, resolve);
    });
    
    liOutsideList.forEach(() => {
        auditResults.push(semanticErrors[15]);
    });
}