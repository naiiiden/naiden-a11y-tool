import { semanticErrors } from "./errors.js";
import { getUniqueSelector, inspectedWindowEval } from "./utils.js";

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

    const headingLevels = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(heading => ({
            tagName: heading.tagName,
            outerHTML: heading.outerHTML,
            selector: getUniqueSelector(heading)
        }));
    `) 
    
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

    const possibleHeadings = await inspectedWindowEval(`
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
    `) 
    
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

    const mainLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll("main, [role='main']"))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `) 
    
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

    const bannersInOtherLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('header, [role="banner"]'))
            .map(header => {
                let parent = header.parentElement;
                while (parent && parent !== document.body) {
                    if (parent.hasAttribute('role') && ['main', 'navigation', 'contentinfo', 'complementary', 'region', 'form', 'search'].includes(parent.getAttribute('role')) ||
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
    `) 
    
    bannersInOtherLandmarks.forEach((banner) => {
        auditResults.push({
            ...semanticErrors[9],
            element: banner.outerHTML,
            selector: banner.selector
        });
    });

    const asidesInOtherLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('aside, [role="complementary"]'))
            .map(aside => {
                let parent = aside.parentElement;
                while (parent && parent !== document.body) {
                    if (parent.hasAttribute('role') && ['main', 'navigation', 'contentinfo', 'region', 'banner', 'form', 'search'].includes(parent.getAttribute('role')) || 
                        ['MAIN', 'NAV', 'FOOTER', 'SECTION', 'HEADER', 'FORM', 'ARTICLE'].includes(parent.tagName)) {
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
    `) 
    
    asidesInOtherLandmarks.forEach(aside => {
        auditResults.push({ 
            ...semanticErrors[10],
            element: aside.outerHTML,
            selector: aside.selector 
        });
    });

    const contentinfoInOtherLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('footer, [role="contentinfo"]'))
            .map(footer => {
                let parent = footer.parentElement;
                while (parent && parent !== document.body) {
                    if (parent.hasAttribute('role') && ['main', 'navigation', 'banner', 'region', 'complementary', 'form', 'search'].includes(parent.getAttribute('role')) || 
                        ['MAIN', 'NAV', 'HEADER', 'SECTION', 'ASIDE', 'ARTICLE', 'FORM'].includes(parent.tagName)) {
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
    `) 
    
    contentinfoInOtherLandmarks.forEach(footer => {
        auditResults.push({ 
            ...semanticErrors[11],
            element: footer.outerHTML,
            selector: footer.selector
        });
    });

    const mainInOtherLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('main, [role="main"]'))
            .map(main => {
                let parent = main.parentElement;
                while (parent && parent !== document.body) {
                    if (parent.hasAttribute('role') && ['contentinfo', 'navigation', 'banner', 'region', 'complementary', 'search', 'form'].includes(parent.getAttribute('role')) || 
                        ['FOOTER', 'NAV', 'HEADER', 'SECTION', 'ASIDE', 'ARTICLE', 'FORM'].includes(parent.tagName)) {
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
    `) 
    
    mainInOtherLandmarks.forEach(main => {
        auditResults.push({ 
            ...semanticErrors[12],
            element: main.outerHTML,
            selector: main.selector 
        });
    });

    const contentOutsideLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const landmarkSelectors = 'header, nav, main, footer, section, aside, form, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="region"], [role="complementary"], [role="form"], [role="search"]';
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
    `) 
    
    contentOutsideLandmarks.forEach(element => {
        auditResults.push({
            ...semanticErrors[13],
            element: element.outerHTML,
            selector: element.selector
        });
    });

    const invalidListContent = await inspectedWindowEval(`
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
    `) 
    
    invalidListContent.forEach((element) => {
        auditResults.push({
            ...semanticErrors[14],
            element: element.outerHTML,
            selector: element.selector
        });
    });

    const liOutsideList = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const liElements = Array.from(document.querySelectorAll('li'));
        const invalidLiElements = liElements.filter(li => {
            const parent = li.parentElement;
            return !(parent && (parent.tagName === 'UL' || parent.tagName === 'OL'));
        }).map(li => ({
            outerHTML: li.outerHTML,
            selector: getUniqueSelector(li)
        }));
        
        return invalidLiElements;
    `) 
    
    liOutsideList.forEach((element) => {
        auditResults.push({
            ...semanticErrors[15],
            element: element.outerHTML,
            selector: element.selector
        });
    });

    const invalidDlElements = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
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
        
        return dlElements
            .filter(dl => !isDlValid(dl))
            .map(dl => ({
                outerHTML: dl.outerHTML,
                selector: getUniqueSelector(dl)
            }));
    `) 
    
    invalidDlElements.forEach((element) => {
        auditResults.push({
            ...semanticErrors[16],
            element: element.outerHTML,
            selector: element.selector
        });
    });

    const invalidDtDdElements = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const dtElements = Array.from(document.querySelectorAll('dt'));
        const ddElements = Array.from(document.querySelectorAll('dd'));
        
        const isInDl = (element) => {
            return element.closest('dl') !== null;
        };
    
        const invalidDtElements = dtElements
            .filter(dt => !isInDl(dt))
            .map(dt => ({
                outerHTML: dt.outerHTML,
                selector: getUniqueSelector(dt)
            }));
    
        const invalidDdElements = ddElements
            .filter(dd => !isInDl(dd))
            .map(dd => ({
                outerHTML: dd.outerHTML,
                selector: getUniqueSelector(dd)
            }));
    
        return [...invalidDtElements, ...invalidDdElements];
    `) 
    
    invalidDtDdElements.forEach((element) => {
        auditResults.push({
            ...semanticErrors[17],
            element: element.outerHTML,
            selector: element.selector
        });
    });
}