import { emptyErrors } from "./errors.js";
import { getUniqueSelector, inspectedWindowEval } from "./utils.js";

export async function emptyAudit(auditResults) {
    const emptyHeadings = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll(":is(h1, h2, h3, h4, h5, h6):not(:has(img))"))
        .map(heading => ({
          outerHTML: heading.outerHTML,
          selector: getUniqueSelector(heading)
        }));
    `) 

    emptyHeadings.forEach(heading => {
        auditResults.push({ ...emptyErrors[0], element: heading.outerHTML, selector: heading.selector });
    });

    const emptyHeadingsWithImages = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .map(heading => {
          const textContent = heading.innerText.trim();
          const img = heading.querySelector('img');
          const imgAlt = img ? img.getAttribute('alt') : null;
          return {
            hasText: textContent.length > 0,
            hasImage: img !== null,
            hasImageAlt: imgAlt !== null && imgAlt.trim() !== "",
            outerHTML: heading.outerHTML,
            selector: getUniqueSelector(heading)
          };
        });
    `)
    
    emptyHeadingsWithImages.forEach(heading => {
        if (!heading.hasText && heading.hasImage && !heading.hasImageAlt) {
            auditResults.push({ ...emptyErrors[0], element: heading.outerHTML, selector: heading.selector });
        }
    });

    const emptyTableHeadings = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll("th:empty"))
        .map(tableHeading => ({
          outerHTML: tableHeading.outerHTML,
          selector: getUniqueSelector(tableHeading)
        }));
    `)
    
    emptyTableHeadings.forEach(tableHeading => {
        auditResults.push({ ...emptyErrors[1], element: tableHeading.outerHTML, selector: tableHeading.selector });
    });

    const iframeTitles = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll("iframe"))
          .filter(iframe => !iframe.hasAttribute("title") || iframe.getAttribute("title").trim() === "")
          .map(iframe => 
              ({ outerHTML: iframe.outerHTML, selector: getUniqueSelector(iframe) 
          }));
    `) 

    iframeTitles.forEach(iframe => {
        auditResults.push({ ...emptyErrors[2], element: iframe.outerHTML, selector: iframe.selector });
    });

    const emptyOrMissingSummaries = await inspectedWindowEval(`
      const getUniqueSelector = ${getUniqueSelector.toString()};
      return Array.from(document.querySelectorAll("details"))
        .filter(details => {
          const summary = details.querySelector("summary");
    
          if (summary) {
            const ariaLabel = summary.hasAttribute('aria-label') ? summary.getAttribute('aria-label') : null;
            const ariaLabelledby = summary.hasAttribute('aria-labelledby') 
              ? document.getElementById(summary.getAttribute('aria-labelledby')) 
              : null;
            const title = summary.hasAttribute('title') ? summary.getAttribute('title') : null;
    
            return summary.innerText.trim() === "" && !(ariaLabel || (ariaLabelledby && ariaLabelledby.textContent.trim()) || title);
          }
    
          return !summary;
        })
        .map(details => ({
          outerHTML: details.outerHTML,
          selector: getUniqueSelector(details),
          summaryExists: !!details.querySelector("summary")
        }));
    `);
    
    emptyOrMissingSummaries.forEach(summary => {
      auditResults.push({ ...emptyErrors[3], element: summary.outerHTML, selector: summary.selector });
    });
}