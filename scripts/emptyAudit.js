import { emptyErrors } from "./errors.js";
import { getUniqueSelector } from "./utils.js";

export async function emptyAudit(auditResults) {
    const headings = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          (() => {
            const getUniqueSelector = ${getUniqueSelector.toString()};
            return Array.from(document.querySelectorAll("h1:not(:has(img)), h2:not(:has(img)), h3:not(:has(img)), h4:not(:has(img)), h5:not(:has(img)), h6:not(:has(img))"))
              .filter(heading => heading.innerText.trim() === "")
              .map(heading => ({
                outerHTML: heading.outerHTML,
                selector: getUniqueSelector(heading)
              }));
          })()
        `, resolve);
    });

    headings.forEach(heading => {
        auditResults.push({ ...emptyErrors[0], element: heading.outerHTML, selector: heading.selector });
    });

    const headingsWithImages = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          (() => {
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
          })()
        `, resolve);
    });
    
    headingsWithImages.forEach(heading => {
        if (!heading.hasText && heading.hasImage && !heading.hasImageAlt) {
            auditResults.push({ ...emptyErrors[0], element: heading.outerHTML, selector: heading.selector });
        }
    });

    const tableHeadings = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
          (() => {
            const getUniqueSelector = ${getUniqueSelector.toString()};
            return Array.from(document.querySelectorAll("th"))
              .filter(tableHeading => tableHeading.innerText.trim() === "")
              .map(tableHeading => ({
                outerHTML: tableHeading.outerHTML,
                selector: getUniqueSelector(tableHeading)
              }));
          })()
        `, resolve);
    });
    
    tableHeadings.forEach(tableHeading => {
        auditResults.push({ ...emptyErrors[1], element: tableHeading.outerHTML, selector: tableHeading.selector });
    });

    const iframeTitles = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const getUniqueSelector = ${getUniqueSelector.toString()};
                return Array.from(document.querySelectorAll("iframe"))
                    .filter(iframe => !iframe.hasAttribute("title") || iframe.getAttribute("title").trim() === "")
                    .map(iframe => 
                        ({ outerHTML: iframe.outerHTML, selector: getUniqueSelector(iframe) 
                    }));
            })()
        `, resolve);
    });

    iframeTitles.forEach(iframe => {
        auditResults.push({ ...emptyErrors[2], element: iframe.outerHTML, selector: iframe.selector });
    });

    const summaries = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            (() => {
                const getUniqueSelector = ${getUniqueSelector.toString()};
                return Array.from(document.querySelectorAll("summary"))
                    .filter(summary => summary.innerText.trim() === "")
                    .map(summary => 
                        ({ outerHTML: summary.outerHTML, selector: getUniqueSelector(summary) 
                    }))
            })()
        `, resolve)
    });

    summaries.forEach(summary => {
        auditResults.push({ ...emptyErrors[3], element: summary.outerHTML, selector: summary.selector });
    });
}