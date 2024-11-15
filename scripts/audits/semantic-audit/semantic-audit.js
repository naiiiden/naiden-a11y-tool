import { semanticErrors } from "../../errors/semantic.js";
import { getUniqueSelector } from "../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../utils/inspected-window-eval.js";
import { hasAsideInOtherLandmarks } from "./has-aside-in-other-landmarks/has-aside-in-other-landmarks.js";
import { hasBannersInOtherLandmarks } from "./has-banners-in-other-landmarks/has-banners-in-other-landmarks.js";
import { hasContentOutsideLandmarks } from "./has-content-outside-landmarks/has-content-outside-landmarks.js";
import { hasContentinfoInOtherLandmarks } from "./has-contentinfo-in-other-landmarks/has-contentinfo-in-other-landmarks.js";
import { hasHeadingLevelOne } from "./has-heading-level-one/has-heading-level-one.js";
import { hasHeadings } from "./has-headings/has-headings.js";
import { hasMainInOtherLandmarks } from "./has-main-in-other-landmarks/has-main-in-other-landmarks.js";
import { hasMoreThanOneBannerLandmark } from "./has-more-than-one-banner-landmark/has-more-thank-one-banner-landmark.js";
import { hasMoreThanOneContentinfoLandmark } from "./has-more-than-one-contentinfo-landmark/has-more-than-one-contentinfo-landmark.js";
import { hasNoMainLandmarkOrMore } from "./has-no-main-landmark-or-more/has-no-main-landmark-or-more.js";
import { hasRegionsOrLandmarks } from "./has-regions-or-landmarks/has-regions-or-landmarks.js";
import { hasHeadingLevels } from "./heading-levels/heading-levels.js";
import { hasPossibleHeadings } from "./possible-headings/possible-headings.js";

export async function semanticAudit(auditResults) {
    await hasHeadingLevelOne(auditResults);
    await hasHeadingLevels(auditResults);
    await hasPossibleHeadings(auditResults);
    await hasHeadings(auditResults);
    
    await hasRegionsOrLandmarks(auditResults);
    await hasNoMainLandmarkOrMore(auditResults);
    await hasMoreThanOneBannerLandmark(auditResults);
    await hasMoreThanOneContentinfoLandmark(auditResults);
    await hasBannersInOtherLandmarks(auditResults);
    await hasAsideInOtherLandmarks(auditResults);
    await hasContentinfoInOtherLandmarks(auditResults);
    await hasMainInOtherLandmarks(auditResults);
    await hasContentOutsideLandmarks(auditResults);
    

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