import { semanticErrors } from "./errors.js";
import { getUniqueSelector } from "./utils.js";

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
        chrome.devtools.inspectedWindow.eval(`
          (() => {
            const getUniqueSelector = ${getUniqueSelector.toString()};
            return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(heading => ({
              tagName: heading.tagName,
              outerHTML: heading.outerHTML,
              selector: getUniqueSelector(heading)
            }));
          })()
        `, resolve);
    });
    
    if (headingLevels.length > 0) {
        let previousLevel = 1;
    
        for (const heading of headingLevels) {
            const currentLevel = parseInt(heading.tagName[1]);
    
            if (currentLevel > previousLevel + 1) {
                auditResults.push({
                    ...semanticErrors[1],
                    element: heading.outerHTML,
                    selector: heading.selector
                });
                break;
            }
    
            if (currentLevel > previousLevel) {
                previousLevel = currentLevel;
            }
        }
    }

    const possibleHeadings = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          (() => {
            const getUniqueSelector = ${getUniqueSelector.toString()};
            return Array.from(document.querySelectorAll('p'))
              .filter(p => p.innerText.trim().length < 50)
              .filter(p => {
                const style = window.getComputedStyle(p);
                const fontSize = parseFloat(style.fontSize);
                const isBold = style.fontWeight === 'bold' || parseInt(style.fontWeight) >= 600;
                const isItalic = style.fontStyle === 'italic';
    
                return fontSize >= 20 || (fontSize >= 16 && (isBold || isItalic));
              })
              .map(p => ({
                outerHTML: p.outerHTML,
                selector: getUniqueSelector(p)
              }));
          })()
        `, resolve);
    });
    
    possibleHeadings.forEach(heading => {
        auditResults.push({
            ...semanticErrors[2],
            element: heading.outerHTML,
            selector: heading.selector
        });
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

    const mainLandmarks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const getUniqueSelector = ${getUniqueSelector.toString()};
                return Array.from(document.querySelectorAll("main, [role='main']"))
                    .map(element => ({
                        outerHTML: element.outerHTML,
                        selector: getUniqueSelector(element)
                    }));
            })()
        `, resolve);
    });
    
    if (mainLandmarks.length < 1) {
        auditResults.push(semanticErrors[5]);
    } else if (mainLandmarks.length > 1) {
        mainLandmarks.forEach((landmark) => {
            auditResults.push({
                ...semanticErrors[6],
                element: landmark.outerHTML,
                selector: landmark.selector
            });
        });
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
            (() => {
                const getUniqueSelector = ${getUniqueSelector.toString()};
                return Array.from(document.querySelectorAll('header, [role="banner"]'))
                    .map(header => {
                        let parent = header.parentElement;
                        while (parent && parent !== document.body) {
                            if (parent.hasAttribute('role') && ['main', 'navigation', 'contentinfo', 'complementary', 'search', 'form', 'region'].includes(parent.getAttribute('role')) ||
                                ['MAIN', 'NAV', 'FOOTER', 'ASIDE', 'SECTION', 'FORM', 'ARTICLE'].includes(parent.tagName)) {
                                return {
                                    outerHTML: header.outerHTML,
                                    selector: getUniqueSelector(header) 
                                };
                            }
                            parent = parent.parentElement;
                        }
                        return null;
                    })
                    .filter(header => header !== null);
            })()
        `, resolve);
    });
    
    bannersInOtherLandmarks.forEach((banner) => {
        auditResults.push({
            ...semanticErrors[9],
            element: banner.outerHTML,
            selector: banner.selector
        });
    });

    const asidesInOtherLandmarks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const getUniqueSelector = ${getUniqueSelector.toString()};
                return Array.from(document.querySelectorAll('aside, [role="complementary"]'))
                    .map(aside => {
                        let parent = aside.parentElement;
                        while (parent && parent !== document.body) {
                            if (parent.hasAttribute('role') && ['main', 'navigation', 'contentinfo', 'banner', 'search', 'form', 'region'].includes(parent.getAttribute('role')) || ['MAIN', 'NAV', 'FOOTER', 'SECTION', 'FORM', 'ARTICLE'].includes(parent.tagName)) {
                                return {
                                    outerHTML: aside.outerHTML,
                                    selector: getUniqueSelector(aside)
                                }
                            }
                        parent = parent.parentElement;
                    }
                        return null;
                    })
                    .filter(aside => aside !== null)
            })()
        `, resolve);
    });
    
    asidesInOtherLandmarks.forEach(aside => {
        auditResults.push({ 
            ...semanticErrors[10],
            element: aside.outerHTML,
            selector: aside.selector 
        });
    });

    const contentinfoInOtherLandmarks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const getUniqueSelector = ${getUniqueSelector.toString()};
                return Array.from(document.querySelectorAll('footer, [role="contentinfo"]'))
                    .map(footer => {
                        let parent = footer.parentElement;
                        while (parent && parent !== document.body) {
                            if (parent.hasAttribute('role') && ['main', 'navigation', 'banner', 'complementary', 'search', 'form', 'region'].includes(parent.getAttribute('role')) || ['MAIN', 'NAV', 'HEADER', 'SECTION', 'FORM', 'ARTICLE'].includes(parent.tagName)) {
                                return {
                                    outerHTML: footer.outerHTML,
                                    selector: getUniqueSelector(footer)
                                }
                            }
                        parent = parent.parentElement;
                    }
                        return null;
                    })
                    .filter(footer => footer !== null)
            })()
        `, resolve);
    });
    
    contentinfoInOtherLandmarks.forEach(footer => {
        auditResults.push({ 
            ...semanticErrors[11],
            element: footer.outerHTML,
            selector: footer.selector
        });
    });

    const mainInOtherLandmarks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const getUniqueSelector = ${getUniqueSelector.toString()};
                return Array.from(document.querySelectorAll('main, [role="main"]'))
                    .map(main => {
                        let parent = main.parentElement;
                        while (parent && parent !== document.body) {
                            if (parent.hasAttribute('role') && ['contentinfo', 'navigation', 'banner', 'complementary', 'search', 'form', 'region'].includes(parent.getAttribute('role')) || ['FOOTER', 'NAV', 'HEADER', 'SECTION', 'FORM', 'ARTICLE'].includes(parent.tagName)) {
                                return {
                                    outerHTML: main.outerHTML,
                                    selector: getUniqueSelector(main)
                                };
                            }
                            parent = parent.parentElement;
                    }
                        return null;
                    })
                    .filter(main => main !== null)
            })()
        `, resolve);
    });
    
    mainInOtherLandmarks.forEach(main => {
        auditResults.push({ 
            ...semanticErrors[12],
            element: main.outerHTML,
            selector: main.selector 
        });
    });

    const contentOutsideLandmarks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const getUniqueSelector = ${getUniqueSelector.toString()};
                const landmarkSelectors = 'header, nav, main, footer, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="region"], [role="search"], [role="form"]';
                const landmarkElements = Array.from(document.querySelectorAll(landmarkSelectors));
    
                const allElements = Array.from(document.body.querySelectorAll(':not(script):not(style)'));
    
                const elementsOutsideLandmarks = allElements.filter(el => {
                    return !landmarkElements.some(landmark => landmark.contains(el));
                });
    
                const filteredElements = elementsOutsideLandmarks.filter(el => {
                    return !elementsOutsideLandmarks.some(parent => parent !== el && parent.contains(el));
                });
    
                return filteredElements
                    .filter(el => {
                        if (el.matches('a[href^="#"]')) {
                            const text = el.innerText.toLowerCase();
                            return !(text.includes('skip') || text.includes('jump'));
                        }
                        return true;
                    })
                    .map(el => ({
                        outerHTML: el.outerHTML,
                        selector: getUniqueSelector(el)
                    }));
            })()
        `, resolve);
    });
    
    contentOutsideLandmarks.forEach(element => {
        auditResults.push({
            ...semanticErrors[13],
            element: element.outerHTML,
            selector: element.selector
        });
    });

    const invalidListContent = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const getUniqueSelector = ${getUniqueSelector.toString()};
                const invalidElements = [];
                const listElements = Array.from(document.querySelectorAll('ul, ol'));
                
                listElements.forEach(list => {
                    const children = Array.from(list.children);
                    children.forEach(child => {
                        if (!['LI', 'SCRIPT', 'TEMPLATE'].includes(child.tagName)) {
                            invalidElements.push({
                                outerHTML: child.outerHTML,
                                selector: getUniqueSelector(child)
                            });
                        }
                    });
                });
                
                return invalidElements;
            })()
        `, resolve);
    });
    
    invalidListContent.forEach((element) => {
        auditResults.push({
            ...semanticErrors[14],
            element: element.outerHTML,
            selector: element.selector
        });
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

    const invalidDlElements = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const dlElements = Array.from(document.querySelectorAll('dl'));
                
                const isDlValid = (dl) => {
                    const validChildTags = ['DT', 'DD', 'DIV', 'SCRIPT', 'TEMPLATE'];
                    const children = Array.from(dl.children);
                    
                    let lastTag = null;
                    for (let child of children) {
                        const tagName = child.tagName;
    
                        if (!validChildTags.includes(tagName)) {
                            return false;
                        }
    
                        if (tagName === 'DT') {
                            if (lastTag === 'DT') {
                                return false;
                            }
                            lastTag = 'DT';
                        } else if (tagName === 'DD') {
                            if (lastTag !== 'DT') {
                                return false; 
                            }
                            lastTag = 'DD';
                        }
                    }
    
                    return true;
                };
                
                return dlElements.filter(dl => !isDlValid(dl));
            })()
        `, resolve);
    });
    
    invalidDlElements.forEach(() => {
        auditResults.push(semanticErrors[16]);
    });

    const invalidDtDdElements = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const dtElements = Array.from(document.querySelectorAll('dt'));
                const ddElements = Array.from(document.querySelectorAll('dd'));
                
                const isInDl = (element) => {
                    return element.closest('dl') !== null;
                };
    
                const invalidDtElements = dtElements.filter(dt => !isInDl(dt));
                const invalidDdElements = ddElements.filter(dd => !isInDl(dd));
    
                return [...invalidDtElements, ...invalidDdElements];
            })()
        `, resolve);
    });
    
    invalidDtDdElements.forEach(() => {
        auditResults.push(semanticErrors[17]);
    });
}