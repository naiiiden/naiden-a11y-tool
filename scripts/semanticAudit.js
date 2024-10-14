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
}
