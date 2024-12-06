import { emptyAudit } from "./audits/empty-elements-audit/empty-audit.js";
import { formAudit } from "./audits/form-audit/form-audit.js";
import { embeddedElementsAudit } from "./audits/embedded-elements-audit/embedded-elements-audit.js";
import { rootAndMetadataAudit } from "./audits/root-and-metadata-audit/root-and-metadata-audit.js";
import { imagesAudit } from "./audits/images-audit/images-audit.js";
import { interactiveElementsAudit } from "./audits/interactive-elements-audit/interactive-elements-audit.js";
import { semanticAudit } from "./audits/semantic-audit/semantic-audit.js";
import { ariaAudit } from "./audits/aria-audit/aria-audit.js";
import { escapeHtml } from "./utils/escape-html.js";

const errorsIndicator = document.getElementById("errors-indicator");
const errorsList = document.getElementById('errors-list');

function emptyErrorMessage(text) {
  if (errorsList.innerHTML === "") {
    errorsIndicator.innerHTML = text;
    return;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('toggle-stylesheets').addEventListener('change', () => {
    const disable = document.getElementById('toggle-stylesheets').checked;
    chrome.devtools.inspectedWindow.eval(
      `(${toggleStylesheets.toString()})(${disable});`
    );
  });

  document.getElementById("run-root-and-metadata-audit-btn").addEventListener("click", () => {
    runAudit([rootAndMetadataAudit]).then(() => {
      emptyErrorMessage("No html and head errors.");
    });
  });

  document.getElementById("run-image-audit-btn").addEventListener("click", () => {
    runAudit([imagesAudit]).then(() => {
      emptyErrorMessage("No image errors.");
    });
  });

  document.getElementById("run-interactive-elements-audit-btn").addEventListener("click", () => {
    runAudit([interactiveElementsAudit]).then(() => {
      emptyErrorMessage("No interactive elements errors.");
    });
  });

  document.getElementById("run-empty-audit-btn").addEventListener("click", () => {
    runAudit([emptyAudit]).then(() => {
      emptyErrorMessage("No empty element errors.");
    });
  });

  document.getElementById("run-form-audit-btn").addEventListener("click", () => {
    runAudit([formAudit]).then(() => {
      emptyErrorMessage("No form errors.");
    });
  });

  document.getElementById("run-embedded-elements-audit-btn").addEventListener("click", () => {
    runAudit([embeddedElementsAudit]).then(() => {
      emptyErrorMessage("No embedded elements errors.");
    });
  });

  document.getElementById("run-semantic-audit-btn").addEventListener("click", () => {
    runAudit([semanticAudit]).then(() => {
      emptyErrorMessage("No semantic errors.");
    });
  });

  document.getElementById("run-aria-audit-btn").addEventListener("click", () => {
    runAudit([ariaAudit]).then(() => {
      emptyErrorMessage("No aria errors.");
    });
  });

  document.getElementById("run-full-audit-btn").addEventListener("click", () => {
    runAudit([rootAndMetadataAudit, imagesAudit, interactiveElementsAudit, emptyAudit, formAudit, embeddedElementsAudit, semanticAudit, ariaAudit]).then(() => {
      emptyErrorMessage("No errors found.");
    });
  });
});

function toggleStylesheets(disable) {
  const stylesheets = document.styleSheets;
  for (let i = 0; i < stylesheets.length; i++) {
    stylesheets[i].disabled = disable;
  }

  document.querySelectorAll('*').forEach((element) => {
    if (disable) {
      if (element.hasAttribute('style')) {
        element.setAttribute('disabled-style', element.getAttribute('style'));
        element.removeAttribute('style');
      }
    } else {
      if (element.hasAttribute('disabled-style')) {
        element.setAttribute('style', element.getAttribute('disabled-style'));
        element.removeAttribute('disabled-style');
      }
    }
  });
}

function displayAuditResults(auditResults) {
  errorsList.innerHTML = '';
  errorsIndicator.innerHTML = "";

  auditResults.forEach((error, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${escapeHtml(error.name)}</strong> - ${error.description}<br>
      <a href="${error.wcagLink}" target="_blank">Learn more</a><br>
      <p>Fix: ${error.fix}</p>
      ${error.element ? `<pre><code>${escapeHtml(error.element)}</code></pre>` : ``}
      ${error.selector ? `<button id="highlight-btn-${index}">Highlight</button>` : ``}
    `;

    if (error.selector) {
      listItem.querySelector(`#highlight-btn-${index}`).addEventListener('click', () => {
        highlightElement(error.selector);
      });
    }

    errorsList.appendChild(listItem);
  });
}

function highlightElement(selector) {
  chrome.devtools.inspectedWindow.eval(`
    (() => {
      const element = document.querySelector('${selector}');
      if (element) {
        if (element.classList.contains('highlighted')) {
          element.classList.remove('highlighted');
          element.style.outline = '';
        } else {
          element.classList.add('highlighted');
          element.style.outline = '3px solid red';
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