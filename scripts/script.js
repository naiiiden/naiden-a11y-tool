const errors = [
  {
    id: 1,
    name: "Page title missing",
    description: "The page is missing a title or the title is empty.",
    wcagLink: "https://www.w3.org/WAI/WCAG21/quickref/#headings-and-labels",
    fix: "Add a descriptive title to the page."
  },
  {
    id: 2,
    name: "Missing alt attribute",
    description: "Some images are missing an alt attribute.",
    wcagLink: "https://www.w3.org/WAI/WCAG21/quickref/#non-text-content",
    fix: "Add descriptive alt text to all images."
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

function evalAsync(script) {
  return new Promise((resolve) => {
    chrome.devtools.inspectedWindow.eval(script, (result) => {
      resolve(result);
    });
  });
}

function runAudit() {
  let auditResults = [];

  // ex1 check if the page has a title
  evalAsync("document.title").then(result => {
    if (!result || result === "") {
      auditResults.push(errors[0]);
    }
    
    // ex2 check each image for missing alt attribute (and ignore valid empty alts)
    return evalAsync(`Array.from(document.querySelectorAll('img')).map((img) => {
      return { alt: img.getAttribute('alt') };
    })`);
  }).then(result => {
    const missingAltImages = result.filter(img => img.alt === null); // Only count those with no alt attribute at all
    missingAltImages.forEach(img => {
      const error = { ...errors[1] }; 
      auditResults.push(error);
    });

    console.log("errors:", auditResults);
    displayAuditResults(auditResults);
  });
}