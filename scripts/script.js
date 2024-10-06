const errors = [
  {
    id: 0,
    name: "Page lang attribute missing or invalid",
    description: "The page is missing language attribute or its value is invalid",
    wcagLink: "",
    fix: "Add a valid lang attribute value"
  },
  {
    id: 1,
    name: "Page title missing",
    description: "The page is missing a title or the title is empty.",
    wcagLink: "https://www.w3.org/WAI/WCAG21/quickref/#headings-and-labels",
    fix: "Add a descriptive title to the page."
  },
  {
    id: 2,
    name: "Image missing alt attribute",
    description: "Some images are missing an alt attribute.",
    wcagLink: "https://www.w3.org/WAI/WCAG21/quickref/#non-text-content",
    fix: "Add descriptive alt text to all images."
  },
  {
    id: 3,
    name: "Linked image missing alt attribute",
    description: "Some linked images are missing an alt attribute.",
    wcagLink: "https://www.w3.org/WAI/WCAG21/quickref/#non-text-content",
    fix: "Add descriptive alt text to all linked images."
  }
];

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


function displayAuditResults(auditResults) {
  const errorsList = document.getElementById('errors-list');
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
      auditResults.push(errors[0]);
    }

    const pageTitle = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval("document.title", resolve);
    });
    
    if (!pageTitle || pageTitle === "") {
      auditResults.push(errors[1]);
    }

    // Check each image for missing alt attributes (and ignore valid empty alts)
    const images = await new Promise((resolve) => {
      chrome.devtools.inspectedWindow.eval(`
        Array.from(document.querySelectorAll('img')).map((img) => {
          return { alt: img.getAttribute('alt'), isLinked: img.closest('a') !== null };
        });
      `, resolve);
    });

    const missingAltImages = images.filter(img => img.alt === null);
    
    missingAltImages.forEach(img => {
      const error = { ...errors[2]  }; 
      auditResults.push(error);
    });

    const linkedImagesWithoutAlt = images.filter(img => img.isLinked && img.alt === null);
    
    linkedImagesWithoutAlt.forEach(img => {
      const error = { ...errors[3] };
      auditResults.push(error);
    });

    console.log("errors:", auditResults);
    displayAuditResults(auditResults);
  } catch (err) {
    console.error("Error during audit:", err);
  }
}