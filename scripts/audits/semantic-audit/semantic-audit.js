import { semanticErrors } from "../../errors/semantic.js";
import { getUniqueSelector } from "../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../utils/inspected-window-eval.js";
import { hasHeadingLevelOne } from "./has-heading-level-one/has-heading-level-one.js";
import { hasHeadings } from "./has-headings/has-headings.js";
import { hasHeadingLevels } from "./heading-levels/heading-levels.js";
import { hasPossibleHeadings } from "./possible-headings/possible-headings.js";

export async function semanticAudit(auditResults) {
    await hasHeadingLevelOne(auditResults);
    await hasHeadingLevels(auditResults);
    await hasPossibleHeadings(auditResults);
    await hasHeadings(auditResults);
    

    

    const hasRegionsOrLandmarks = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          document.querySelectorAll('header, nav, main, footer, aside, form, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="complementary"], [role="search"], :is([role="region"], [role="form"]):is([aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""]))').length
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

    const moreThanOneBannerLandmark = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            document.querySelectorAll("[role='banner']").length
        `, resolve);
    });

    if (moreThanOneBannerLandmark > 1) {
        auditResults.push(semanticErrors[7]);
    } 

    const moreThanOneContentinfoLandmark = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            document.querySelectorAll("[role='contentinfo']").length
        `, resolve);
    });

    if (moreThanOneContentinfoLandmark > 1) {
        auditResults.push(semanticErrors[8]);
    }

    const bannersInOtherLandmarks = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
          :is(header, nav, main, section, form, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
                :is([role="region"], [role="form"]):is(
                    [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
                ), 
                [role="complementary"], [role="contentinfo"], [role="search"]) 
          :is(header:not([role]):not(:is(article, aside, main, nav, section) header:not([role])), [role="banner"])
        \`))
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
                :is([role="region"], [role="form"]):is(
                    [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
                ), 
                [role="complementary"], [role="contentinfo"], [role="search"]) 
          :is(aside:not([role]), [role="complementary"])
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
        return Array.from(document.querySelectorAll(\`
            :is(header, nav, main, section, form, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
                    :is([role="region"], [role="form"]):is(
                        [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
                    ), 
                    [role="complementary"], [role="contentinfo"], [role="search"])
            :is(footer:not([role]):not(:is(article, aside, main, nav, section) footer:not([role])), [role="contentinfo"])
        \`))
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
        return Array.from(document.querySelectorAll(\`
          :is(header, nav, main, section, form, article, aside, footer, [role="banner"], [role="navigation"], [role="main"], 
                :is([role="region"], [role="form"]):is(
                    [aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])
                ), 
                [role="complementary"], [role="contentinfo"], [role="search"]) 
          :is(main:not([role]), [role="main"])
        \`))
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
        return Array.from(document.querySelectorAll('body > *:not(:is(header, nav, main, footer, section, aside, form, [role="banner"], [role="navigation"], [role="main"], [role="contentinfo"], [role="complementary"], [role="search"], :is([role="region"], [role="form"]):is([aria-labelledby]:not([aria-labelledby=""]), [aria-label]:not([aria-label=""]), [title]:not([title=""])), style, script))'))
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