import { linksAndButtonsErrors } from "../errors/linksAndButtons.js";
import { getUniqueSelector, inspectedWindowEval } from "../utils.js";

export async function linksAndButtonsAudit(auditResults) {
    const emptyLinks = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll('a:not(:has(img)):empty'))
          .map(link => ({
              outerHTML: link.outerHTML,
              selector: getUniqueSelector(link)
          }));
    `) 

    emptyLinks.forEach(link => {
        auditResults.push({ ...linksAndButtonsErrors[0], element: link.outerHTML, selector: link.selector });
    });

    const emptyButtons = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll(':is([role="button"], button):not(:has(img)):empty'))
        .filter(button => {
            const ariaLabel = button.hasAttribute('aria-label') ? button.getAttribute('aria-label').trim() : null;
            const ariaLabelledby = button.hasAttribute('aria-labelledby') 
              ? document.getElementById(button.getAttribute('aria-labelledby')) 
              : null;
            const title = button.hasAttribute('title') ? button.getAttribute('title').trim() : null;
            
            return !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
        })
        .map(button => ({
            outerHTML: button.outerHTML,
            selector: getUniqueSelector(button)
        }));
  `);
  
    emptyButtons.forEach(button => {
        auditResults.push({ ...linksAndButtonsErrors[1], element: button.outerHTML, selector: button.selector });
    });

    const brokenSkipLinks = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll('a[href^="#"]')).map(link => {
        const linkText = link.innerText.toLowerCase();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const isHidden = window.getComputedStyle(link).display === "none" || window.getComputedStyle(link).visibility === "hidden";
        
        return {
          linkText,
          targetExists: !!targetElement,
          isHidden,
          linkOuterHTML: link.outerHTML,
          linkSelector: getUniqueSelector(link)
        };
      });
    `) 
    
    brokenSkipLinks
      .filter(link => (link.linkText.includes('skip') || link.linkText.includes('jump')) && (!link.targetExists || link.isHidden))
      .forEach(link => {
        auditResults.push({
          ...linksAndButtonsErrors[2],
          element: link.linkOuterHTML,
          selector: link.linkSelector
        });
    });

    const interactiveControlsWithInteractiveControlsAsChildren = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll(':is(button, a, [role="button"], [role="link"]):has(a, button, [role="button"], [role="link"], input, [tabindex], textarea, select)'))
        .map(element => {
          return {
            outerHTML: element.outerHTML,
            selector: getUniqueSelector(element)
          };
        });
    `) 
    
    interactiveControlsWithInteractiveControlsAsChildren.forEach((element) => {
          auditResults.push({
            ...linksAndButtonsErrors[3],
            element: element.outerHTML,
            selector: element.selector
          });
    });

    const brokenSamePageLinks = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll('a[href^="#"]'))
        .filter(link => {
          const linkText = link.innerText.toLowerCase();
          return !(linkText.includes('jump') || linkText.includes('skip'));
        })
        .map(link => {
          const targetId = link.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          return {
            targetExists: !!targetElement,
            outerHTML: link.outerHTML,
            selector: getUniqueSelector(link)
          };
        });
    `) 
    
    brokenSamePageLinks
      .filter(link => !link.targetExists)
      .forEach(link => {
        auditResults.push({
          ...linksAndButtonsErrors[4],
          element: link.outerHTML,
          selector: link.selector
        });
    });
}