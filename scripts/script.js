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

function runAudit() {
  let auditResults = [];

  // ex1 check if the page has a title
  chrome.devtools.inspectedWindow.eval(
    "document.title", 
    (result) => {
      if (!result || result === "") {
        auditResults.push(errors[0]);
      }
    }
  );

  // ex2 check if images have alt attributes
  chrome.devtools.inspectedWindow.eval(
    `Array.from(document.querySelectorAll('img')).some(img => !img.alt)`,
    (result) => {
      if (result) {
        auditResults.push(errors[1]);
      }
    }
  );

  console.log("errors", auditResults);
}