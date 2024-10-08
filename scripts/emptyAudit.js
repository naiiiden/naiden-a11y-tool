import { emptyErrors } from "./errors.js";

export async function emptyAudit(auditResults) {
    const headings = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`Array.from(document.querySelectorAll("h1:not(:has(img)), h2:not(:has(img)), h3:not(:has(img)), h4:not(:has(img)), h5:not(:has(img)), h6:not(:has(img))")).filter(heading => heading.innerText.trim() === "").map(heading => heading.outerHTML)`, resolve)
    });

    headings.forEach(() => {
        auditResults.push(emptyErrors[0]);
    });

    const headingsWithImages = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((heading) => {
            const textContent = heading.innerText.trim();
            const img = heading.querySelector('img');
            const imgAlt = img ? img.getAttribute('alt') : null;
            return { hasText: textContent.length > 0, hasImage: img !== null, hasImageAlt: imgAlt !== null && imgAlt.trim() !== "" };
            });
        `, resolve);
    });
    
    headingsWithImages.forEach((heading) => {
        if (!heading.hasText && heading.hasImage && !heading.hasImageAlt) {
            auditResults.push(emptyErrors[0]);
        }
    });

    const tableHeadings = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`Array.from(document.querySelectorAll("th")).filter(tableHeading => tableHeading.innerText.trim() === "").map(tableHeading => tableHeading.outerHTML)`, resolve)
    });

    tableHeadings.forEach(() => {
        auditResults.push(emptyErrors[1]);
    });

    const iframeTitles = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`
            Array.from(document.querySelectorAll("iframe")).filter(iframe => !iframe.hasAttribute("title") || iframe.getAttribute("title").trim() === "").map(iframe => iframe.outerHTML)
        `, resolve);
    });

    iframeTitles.forEach(() => {
        auditResults.push(emptyErrors[2]);
    });

    const summaries = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`Array.from(document.querySelectorAll("summary")).filter(summary => summary.innerText.trim() === "").map(summary => summary.outerHTML)`, resolve)
    });

    summaries.forEach(() => {
        auditResults.push(emptyErrors[3]);
    });
}