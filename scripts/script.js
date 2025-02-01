import { emptyAudit } from "./audits/empty-elements-audit/empty-audit.js";
import { formAudit } from "./audits/form-audit/form-audit.js";
import { embeddedElementsAudit } from "./audits/embedded-elements-audit/embedded-elements-audit.js";
import { rootAndMetadataAudit } from "./audits/root-and-metadata-audit/root-and-metadata-audit.js";
import { imagesAudit } from "./audits/images-audit/images-audit.js";
import { interactiveElementsAudit } from "./audits/interactive-elements-audit/interactive-elements-audit.js";
import { semanticAudit } from "./audits/semantic-audit/semantic-audit.js";
import { ariaAudit } from "./audits/aria-audit/aria-audit.js";
import { escapeHtml } from "./utils/escape-html.js";
import { cssAudit } from "./audits/css-audit/css-audit.js";
import { deprecatedElementsAudit } from "./audits/deprecated-elements-audit/deprecated-elements-audit.js";

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

  document.getElementById("run-css-audit-btn").addEventListener("click", () => {
    runAudit([cssAudit]).then(() => {
      emptyErrorMessage("No css errors.");
    });
  });

  document.getElementById("run-deprecated-elements-audit-btn").addEventListener("click", () => {
    runAudit([deprecatedElementsAudit]).then(() => {
      emptyErrorMessage("No deprecated elements errors.");
    });
  });

  document.getElementById("run-full-audit-btn").addEventListener("click", () => {
    runAudit([rootAndMetadataAudit, imagesAudit, interactiveElementsAudit, emptyAudit, formAudit, embeddedElementsAudit, semanticAudit, ariaAudit, cssAudit, deprecatedElementsAudit]).then(() => {
      emptyErrorMessage("No errors found.");
    });
  });
});

document.querySelectorAll("input[type='checkbox'][id$='checkbox'").forEach(input => {
  input.addEventListener("click", (e) => {
    console.log(e.target.value);
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

    let wcagLinks = '';
    if (error.wcagLinks) {
      for (const wcagLink of error.wcagLinks) {
        wcagLinks += `
          <a href="${wcagLink.url}" target="_blank">
            ${wcagLink.name} <img src="assets/open-in-new.svg" alt="(opens in a new tab)"/>
          </a>
        `;
      }
    }

    listItem.innerHTML = `
      <strong>${escapeHtml(error.name)}</strong> - ${escapeHtml(error.description)}<br>
      ${wcagLinks}
      <br>
      ${error.selector ? `<p>Location: ${error.selector}</p>` : ``}
      ${
        error.selector 
          ? `<button id="highlight-btn-${index}">
              Highlight
              <img src="assets/highlight.svg" alt=""/>
            </button>` 
          : ``
      }
      ${error.element ? `<pre><code>${escapeHtml(error.element)}</code></pre>` : ``}
      <p>How to fix: ${error.fix}</p>
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