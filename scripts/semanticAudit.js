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
              const isBold = style.fontWeight === 'bold' || parseInt(style.fontWeight) >= 700;
              const isItalic = style.fontStyle === 'italic';
    
              return fontSize >= 20 || (fontSize >= 16 && (isBold || isItalic));
            })
            .map(p => p.outerHTML)
        `, resolve);
      });
    
    possibleHeadings.forEach(() => {
        auditResults.push(semanticErrors[2]);
    });
}
