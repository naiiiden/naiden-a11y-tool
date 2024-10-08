import { htmlAndHeadErrors, imageLinkAndButtonErrors, emptyErrors, formErrors } from "./errors.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('toggle-stylesheets').addEventListener('change', () => {
    const disable = document.getElementById('toggle-stylesheets').checked;

    chrome.devtools.inspectedWindow.eval(
      `(${toggleStylesheets.toString()})(${disable});`
    );
  });

  document.getElementById('highlight-btn').addEventListener('click', () => {
    chrome.devtools.inspectedWindow.eval(
      `(${highlightElements.toString()})();`
    );
  });

  document.getElementById("start-audit-btn").addEventListener("click", () => {
    runAudit();
  });
});

function toggleStylesheets(disable) {
  const stylesheets = document.styleSheets;
  for (let i = 0; i < stylesheets.length; i++) {
    stylesheets[i].disabled = disable;
  }
}

function highlightElements() {
  const elements = document.querySelectorAll('body *:not(div):not(span)');
  elements.forEach(element => {
    if (element.style.outline == "") {
      element.style.outline = '2px solid red'; 
    } else {
      element.style.outline = "";
    }
  });
}


const errorsList = document.getElementById('errors-list');
function displayAuditResults(auditResults) {
  errorsList.innerHTML = '';

  auditResults.forEach(error => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${error.name}</strong> - ${error.description}<br>
      <a href="${error.wcagLink}" target="_blank">Learn more</a><br>
      <p>Fix: ${error.fix}</p>
    `;
    errorsList.appendChild(listItem);
  });
}

async function runAudit() {
  let auditResults = [];

  try {
    const htmlLanguage = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval("document.documentElement", resolve);
    });

    const validLangValues = [
      "ab", "aa", "af", "ak", "sq", "am", "ar", "an", "hy", "as", "av", "ae", "ay", "az", "bm", "ba", "eu", "be", "bn",
      "bi", "bs", "br", "bg", "my", "ca", "ch", "ce", "zh", "cu", "cv", "kw", "co", "cr", "cs", "da", "dv", "nl", "dz",
      "en", "eo", "et", "ee", "fo", "fj", "fi", "fr", "fy", "ff", "gd", "gl", "lg", "ka", "de", "ki", "el", "kl", "gn",
      "gu", "ht", "ha", "he", "hz", "hi", "ho", "hr", "hu", "ig", "is", "io", "ii", "iu", "ie", "ia", "id", "ik", "it",
      "jv", "ja", "kn", "kr", "ks", "kk", "km", "ki", "rw", "ky", "kv", "kg", "ko", "kj", "ku", "lo", "la", "lv", "li",
      "ln", "lt", "lb", "lu", "mk", "mg", "ms", "ml", "mt", "gv", "mi", "mr", "mh", "mn", "na", "nv", "nd", "ne", "ng",
      "nb", "nn", "no", "ii", "nr", "oc", "oj", "or", "om", "os", "pa", "pi", "fa", "pl", "pt", "ps", "qu", "rm", "ro",
      "rn", "ru", "se", "sm", "sg", "sa", "sc", "sr", "sn", "sd", "si", "sk", "sl", "so", "st", "es", "su", "sw", "ss",
      "sv", "ta", "te", "tg", "th", "ti", "bo", "tk", "tl", "tn", "to", "tr", "ts", "tt", "tw", "ty", "ug", "uk", "ur",
      "uz", "ve", "vi", "vo", "wa", "cy", "wo", "xh", "yi", "yo", "za", "zu"
    ];

    if (!htmlLanguage.lang || !validLangValues.includes(htmlLanguage.split('-')[0])) {
      auditResults.push(htmlAndHeadErrors[0]);
    }

    const pageTitle = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval("document.title", resolve);
    });
    
    if (!pageTitle || pageTitle === "") {
      auditResults.push(htmlAndHeadErrors[1]);
    }

    const metaRefresh = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval(`document.querySelector('meta[http-equiv="refresh"]')`, resolve);
    })

    if ((metaRefresh && metaRefresh.content) || (metaRefresh && metaRefresh.content !== "")) {
      auditResults.push(htmlAndHeadErrors[2]);
    }

    const metaViewport = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval("document.querySelector('meta[name=\"viewport\"]')?.getAttribute('content')", resolve);
    })

    if (metaViewport && (metaViewport.includes('user-scalable=no') || metaViewport.includes('user-scalable=0'))) {
      auditResults.push(htmlAndHeadErrors[3]);
    }

    const missingAltImages = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval(`
        Array.from(document.querySelectorAll('img:not(a img):not(button img)')).map((img) => {
          return { alt: img.getAttribute('alt') };
        });
      `, resolve);
    });

    missingAltImages.filter(img => img.alt === null).forEach(() => {
      auditResults.push(imageLinkAndButtonErrors[0]);
    });

    const linkedImages = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval(`
        Array.from(document.querySelectorAll('a img')).map((img) => {
          const parentText = img.closest('a').innerText.trim();
          return { alt: img.getAttribute('alt'), hasText: parentText.length > 0 };
        });
      `, resolve);
    });

    linkedImages.forEach((img) => {
      if (img.hasText && img.alt === null) {
        auditResults.push(imageLinkAndButtonErrors[0]);
      } else if (!img.hasText && (!img.alt || img.alt === "")) {
        auditResults.push(imageLinkAndButtonErrors[1]);
      }
    });

    const buttonImages = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval(`
        Array.from(document.querySelectorAll('button img')).map((img) => {
          const parentText = img.closest('button').innerText.trim();
          return { alt: img.getAttribute('alt'), hasText: parentText.length > 0 };
        });
      `, resolve);
    });

    buttonImages.forEach((img) => {
      if (img.hasText && img.alt === null) {
        auditResults.push(imageLinkAndButtonErrors[0]); 
      } else if (!img.hasText && (!img.alt || img.alt === "")) {
        auditResults.push(imageLinkAndButtonErrors[2]);
      }
    });

    const emptyLinks = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval(`
        Array.from(document.querySelectorAll('a:not(:has(img)')).filter(link => !link.innerText.trim()).map(link => link.outerHTML);
      `, resolve);
    });

    emptyLinks.forEach(() => {
      auditResults.push(imageLinkAndButtonErrors[3]);
    });

    const emptyButtons = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval(`
        Array.from(document.querySelectorAll('button:not(:has(img)')).filter(button => !button.innerText.trim()).map(button => button.outerHTML);
      `, resolve);
    });

    emptyButtons.forEach(() => {
      auditResults.push(imageLinkAndButtonErrors[4]);
    });

    const imageMaps = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval(`
        Array.from(document.querySelectorAll('img[usemap]')).map((img) => {
          const usemapName = img.getAttribute('usemap').substring(1);
          const mapElement = document.querySelector('map[name="' + usemapName + '"]');
          const areas = mapElement ? Array.from(mapElement.querySelectorAll('area')) : [];
          return {
            imgAlt: img.getAttribute('alt'),
            areas: areas.map(area => area.getAttribute('alt'))
          };
        });
      `, resolve);
    });
    
    imageMaps.forEach(map => {
      if (!map.imgAlt || map.imgAlt === "") {
        auditResults.push(imageLinkAndButtonErrors[5]);
      }
    
      map.areas.forEach(areaAlt => {
        if (!areaAlt || areaAlt === "") {
          auditResults.push(imageLinkAndButtonErrors[6]);
        }
      });
    });    

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

    const labels = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval(`Array.from(document.querySelectorAll("label")).filter(label => label.innerText.trim() === "").map(label => label.outerHTML)`, resolve)
    });

    labels.forEach(() => {
      auditResults.push(formErrors[0]);
    });

    console.log("errors:", auditResults);
    displayAuditResults(auditResults);
  } catch (err) {
    console.error("Error during audit:", err);
  }
}