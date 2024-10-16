import { emptyAudit } from "./emptyAudit.js";
import { formAudit } from "./formAudit.js";
import { htmlAndHeadAudit } from "./htmlAndHeadAudit.js";
import { imageLinkAndButtonAudit } from "./imageLinkAndButtonsAudit.js";
import { semanticAudit } from "./semanticAudit.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('toggle-stylesheets').addEventListener('change', () => {
    const disable = document.getElementById('toggle-stylesheets').checked;
    chrome.devtools.inspectedWindow.eval(
      `(${toggleStylesheets.toString()})(${disable});`
    );
  });

  document.getElementById("run-html-and-head-audit-btn").addEventListener("click", () => {
    runAudit([htmlAndHeadAudit]);
  });

  document.getElementById("run-image-link-and-button-audit-btn").addEventListener("click", () => {
    runAudit([imageLinkAndButtonAudit]);
  });

  document.getElementById("run-empty-audit-btn").addEventListener("click", () => {
    runAudit([emptyAudit]);
  });

  document.getElementById("run-form-audit-btn").addEventListener("click", () => {
    runAudit([formAudit]);
  });

  document.getElementById("run-semantic-audit-btn").addEventListener("click", () => {
    runAudit([semanticAudit]);
  });

  document.getElementById("run-full-audit-btn").addEventListener("click", () => {
    runAudit([htmlAndHeadAudit, imageLinkAndButtonAudit, emptyAudit, formAudit, semanticAudit]);
  });
});

function toggleStylesheets(disable) {
  const stylesheets = document.styleSheets;
  for (let i = 0; i < stylesheets.length; i++) {
    stylesheets[i].disabled = disable;
  }
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const errorsList = document.getElementById('errors-list');
function displayAuditResults(auditResults) {
  errorsList.innerHTML = '';

  auditResults.forEach((error, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${error.name}</strong> - ${error.description}<br>
      <a href="${error.wcagLink}" target="_blank">Learn more</a><br>
      <p>Fix: ${error.fix}</p>
      <pre><code>${escapeHtml(error.element)}</code></pre>
      <button id="highlight-btn-${index}">Highlight</button>
    `;

    listItem.querySelector(`#highlight-btn-${index}`).addEventListener('click', () => {
      highlightElement(error.selector);
    });

    errorsList.appendChild(listItem);
  });
}

function highlightElement(selector) {
  chrome.devtools.inspectedWindow.eval(`
    (() => {
      const element = document.querySelector('${selector}');
      if (element) {
        // Check if the element already has the highlight class
        if (element.classList.contains('highlighted')) {
          element.classList.remove('highlighted'); // Remove highlight
          element.style.outline = ''; // Reset outline style
        } else {
          element.classList.add('highlighted'); // Add highlight
          element.style.outline = '3px solid red'; // Apply outline style
        }
      }
    })();
  `);
}

async function runAudit(auditFuncs) {
  let auditResults = [];

  try {
    for (const auditFunc of auditFuncs) {
      await auditFunc(auditResults)
    }

    console.log("errors:", auditResults);
    displayAuditResults(auditResults);
  } catch (err) {
    console.error("Error during audit:", err);
  }
}