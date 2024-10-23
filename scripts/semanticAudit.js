import { semanticErrors } from "./errors.js";
import { getUniqueSelector, inspectedWindowEval } from "./utils.js";

export async function semanticAudit(auditResults) {
    const hasH1 = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(
        `!!document.querySelector('h1') || !!document.querySelector('[role="heading"][aria-level="1"]')`,
        resolve
        );
    });

    if (!hasH1) {
        auditResults.push(semanticErrors[0]);
    }

    const headingLevels = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]')).map(heading => {
            let level;
        
            if (heading.hasAttribute('role') && heading.getAttribute('role') === 'heading') {
                const ariaLevel = heading.getAttribute('aria-level');
                if (ariaLevel && !isNaN(ariaLevel)) {
                    level = parseInt(ariaLevel, 10);
                } else {
                    level = 2;
                }
            } else {
                level = parseInt(heading.tagName[1], 10);
            }
        
            return {
                level,
                tagName: heading.tagName,
                outerHTML: heading.outerHTML,
                selector: getUniqueSelector(heading)
            };
        });
    `);
      
    if (headingLevels.length > 0) {
        let previousLevel = 1;
      
        for (const heading of headingLevels) {
          const currentLevel = heading.level;
      
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
        Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]')).length > 0
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
        return Array.from(document.querySelectorAll('main header, nav header, footer header, aside header, section header, form header, article header, [role="main"] [role="banner"], [role="navigation"] [role="banner"], [role="contentinfo"] [role="banner"], [role="complementary"] [role="banner"], [role="region"] [role="banner"], [role="form"] [role="banner"], [role="search"] [role="banner"]'))
            .map(header => ({
                outerHTML: header.outerHTML,
                selector: getUniqueSelector(header)
            }));
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
        return Array.from(document.querySelectorAll(\`
          :is(header, nav, main, section, form, article, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
                [role="region"]:is(
                    [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
                ), 
                [role="form"]:is(
                    [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
                ), [role="complementary"], [role="contentinfo"]) 
          :is(aside, [role="complementary"])
        \`))
        .map(aside => ({
          outerHTML: aside.outerHTML,
          selector: getUniqueSelector(aside)
        }));
    `);

    asidesInOtherLandmarks.forEach(aside => {
        auditResults.push({
            ...semanticErrors[10],
            element: aside.outerHTML,
            selector: aside.selector
        });
    });

    const contentinfoInOtherLandmarks = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    return Array.from(document.querySelectorAll('main footer, nav footer, section footer, header footer, article footer, form footer, aside footer, [role="main"] footer, [role="navigation"] footer, [role="region"] footer, [role="complementary"] footer, [role="form"] footer, [role="search"] footer'))
        .map(footer => ({
            outerHTML: footer.outerHTML,
            selector: getUniqueSelector(footer)
        }));
    `);
    
    contentinfoInOtherLandmarks.forEach(footer => {
        auditResults.push({
            ...semanticErrors[11],
            element: footer.outerHTML,
            selector: footer.selector
        });
    });

    const mainInOtherLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('nav main, footer main, section main, header main, article main, form main, aside main, [role="navigation"] main, [role="contentinfo"] main, [role="region"] main, [role="complementary"] main, [role="form"] main, [role="search"] main'))
            .map(main => ({
                outerHTML: main.outerHTML,
                selector: getUniqueSelector(main)
            }));
    `);
    
    mainInOtherLandmarks.forEach(main => {
        auditResults.push({
            ...semanticErrors[12],
            element: main.outerHTML,
            selector: main.selector
        });
    });

    const contentOutsideLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('body > *:not(:is(header, nav, main, footer, section, aside, form, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="region"], [role="complementary"], [role="form"], [role="search"], style, script))'))
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
        return Array.from(document.querySelectorAll(':is(ul, ol) > :not(li):not(script):not(template)'))
        .map(element => ({
            outerHTML: element.outerHTML,
            selector: getUniqueSelector(element)
        }));
    `);
    
    invalidListContent.forEach((element) => {
        auditResults.push({
            ...semanticErrors[14],
            element: element.outerHTML,
            selector: element.selector
        });
    });

    const liOutsideList = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll('li:not(ul li, ol li)'))
        .map(li => ({
            outerHTML: li.outerHTML,
            selector: getUniqueSelector(li)
        }));
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
        return Array.from(document.querySelectorAll('dt:not(dl dt), dd:not(dl dd)'))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `);
    
    invalidDtDdElements.forEach((element) => {
        auditResults.push({
            ...semanticErrors[17],
            element: element.outerHTML,
            selector: element.selector
        });
    });
}