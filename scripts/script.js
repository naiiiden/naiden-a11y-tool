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

  const auditFuncsMap = {
    "root-and-metadata": rootAndMetadataAudit,
    "image": imagesAudit,
    "interactive-elements": interactiveElementsAudit,
    "empty-elements": emptyAudit,
    "form": formAudit,
    "embedded-elements": embeddedElementsAudit,
    "semantic": semanticAudit,
    "aria": ariaAudit,
    "css": cssAudit,
    "deprecated-elements": deprecatedElementsAudit
  };
  
  const auditCheckboxes = document.querySelectorAll("input[type='checkbox'][id$='checkbox'");
  const auditFuncsArray = [];
  
  auditCheckboxes.forEach(input => {
    input.addEventListener("click", (e) => {
      const selectedAudit = auditFuncsMap[e.target.value];

      if (!auditFuncsArray.includes(selectedAudit)) {
        auditFuncsArray.push(selectedAudit);
        console.log(auditFuncsArray)
      } else if (auditFuncsArray.includes(e.target.value)) {
        auditFuncsArray.splice(auditFuncsArray.indexOf(selectedAudit), 1);
      }
    });
  });
  
  document.querySelector("input[type='button'][id='select-all']").addEventListener('click', () => {
    const allCheckboxesChecked = Array.from(auditCheckboxes).every(checkbox => checkbox.checked);

    if (!allCheckboxesChecked) {
      auditCheckboxes.forEach(input => {
        input.checked = true;
        const selectedAudit = auditFuncsMap[input.value];

        if (!auditFuncsArray.includes(selectedAudit)) {
          auditFuncsArray.push(selectedAudit);
        }
      });
    } else if (allCheckboxesChecked) {
      auditCheckboxes.forEach(input => {
        input.checked = false;
        const selectedAudit = auditFuncsMap[input.value];
        
        if (auditFuncsArray.includes(selectedAudit)) {
          auditFuncsArray.splice(auditFuncsArray.indexOf(selectedAudit), 1);
        }
      })
    }
  });

  document.getElementById("run-audit-btn").addEventListener("click", () => {
    runAudit(auditFuncsArray).then(() => {
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