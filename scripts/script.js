import { emptyAudit } from "./audits/empty-elements-audit/empty-audit.js";
import { formAudit } from "./audits/form-audit/form-audit.js";
import { embeddedElementsAudit } from "./audits/embedded-elements-audit/embedded-elements-audit.js";
import { rootAndMetadataAudit } from "./audits/root-and-metadata-audit/root-and-metadata-audit.js";
import { imagesAudit } from "./audits/images-audit/images-audit.js";
import { interactiveElementsAudit } from "./audits/interactive-elements-audit/interactive-elements-audit.js";
import { semanticAudit } from "./audits/semantic-audit/semantic-audit.js";
import { ariaAudit } from "./audits/aria-audit/aria-audit.js";
import { cssAudit } from "./audits/css-audit/css-audit.js";
import { deprecatedElementsAudit } from "./audits/deprecated-elements-audit/deprecated-elements-audit.js";
import { colourAudit } from "./audits/colour-audit/colour-audit.js";

import { escapeHtml } from "./utils/escape-html.js";
import { highlightElement } from "./utils/highlight-element.js";
import { highlightElementInDevTools } from "./utils/highlight-element-in-dev-tools.js";
import { toggleStylesheets } from "./utils/toggle-stylesheets.js";
import { truncateIfTooManyChildren } from "./utils/truncate-if-too-many-children.js";

document.addEventListener("DOMContentLoaded", () => {
  function emptyErrorMessage(text) {
    if (errorsList.innerHTML === "") {
      errorsIndicator.innerHTML = text;
      return;
    }
  }

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
    "deprecated-elements": deprecatedElementsAudit,
    "colour": colourAudit
  };
  
  const auditCheckboxes = document.querySelectorAll("input[type='checkbox'][id$='checkbox'");
  const selectAllBtn = document.querySelector("input[type='button'][id='select-all']");
  const runAuditBtn = document.querySelector("#run-audit-btn");
  const errorsCountTotal = document.querySelector("#errors-count-total");
  const errorsIndicator = document.getElementById("errors-indicator");
  const errorsList = document.getElementById('errors-list');
  const auditFuncsArray = [];
  let auditResults = [];

  auditCheckboxes.forEach(checkbox => {
    checkbox.checked = true;
    const selectedAudit = auditFuncsMap[checkbox.value];
    auditFuncsArray.push(selectedAudit);
  });

  function updateSelectAllButton() {
    const allCheckboxesChecked = Array.from(auditCheckboxes).every(checkbox => checkbox.checked);
    selectAllBtn.value = allCheckboxesChecked ? "deselect all" : "select all";  
  }

  function updateRunButton() {
    const someCheckboxesChecked = Array.from(auditCheckboxes).some(checkbox => checkbox.checked);
    runAuditBtn.disabled = someCheckboxesChecked ? false : true;
  }

  updateRunButton();
  updateSelectAllButton();
  
  auditCheckboxes.forEach(input => {
    input.addEventListener("click", (e) => {
      const selectedAudit = auditFuncsMap[e.target.value];

      if (!auditFuncsArray.includes(selectedAudit)) {
        auditFuncsArray.push(selectedAudit);
      } else if (auditFuncsArray.includes(e.target.value)) {
        auditFuncsArray.splice(auditFuncsArray.indexOf(selectedAudit), 1);
      }

      updateSelectAllButton();
      updateRunButton();
    });
  });
  
  selectAllBtn.addEventListener('click', () => {
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

    updateSelectAllButton();
    updateRunButton();
  });

  runAuditBtn.addEventListener("click", async () => {
    await runAudit(auditFuncsArray);

    if (auditResults.length === 0) {
      emptyErrorMessage("No errors found.");
    }

    errorsCountTotal.style.display = "unset";
    errorsCountTotal.firstElementChild.textContent = `${auditResults.length}`;
    errorsCountTotal.lastElementChild.textContent = `${auditResults.length === 1 ? "error" : "errors"}`;

    const errorsCountIndividualType = {
      "root-and-metadata": { name: "root and metadata", count: 0 },
      "image": { name: "image", count: 0 },
      "empty": { name: "empty element", count: 0 },
      "form": { name: "form", count: 0 },
      "embedded": { name: "embedded element", count: 0 },
      "semantic": { name: "semantic", count: 0 },
      "aria": { name: "aria", count: 0 },
      "css": { name: "css", count: 0 },
      "deprecated": { name: "deprecated element", count: 0 },
      "colour": { name: "colour", count: 0 }
    };

    auditResults.forEach(error => {
      if (error.type in errorsCountIndividualType) {
        errorsCountIndividualType[error.type].count++;
      }
    });

    for (const type in errorsCountIndividualType) {
      if (errorsCountIndividualType.hasOwnProperty(type)) {
        const elements = document.querySelectorAll(`.${type}`);
        elements.forEach(element => {
          element.firstElementChild.textContent = errorsCountIndividualType[type].count;
          element.lastElementChild.textContent = `${errorsCountIndividualType[type].name} ${errorsCountIndividualType[type].count === 1 ? "error" : "errors"}`;
        });
      }
    }
  });

  function displayAuditResults(auditResults) {
    errorsList.innerHTML = '';
    errorsIndicator.innerHTML = "";

    auditResults.forEach((error, index) => {
      const listItem = document.createElement('li');

      let wcagLinks = '';
      if (error.wcagLinks) {
        for (const wcagLink of error.wcagLinks) {
          wcagLinks += `
            <li>
              <a href="${wcagLink.url}" target="_blank">
                ${wcagLink.name} <img src="assets/open-in-new.svg" alt="(opens in a new tab)"/>
              </a>
            </li>
          `;
        }
      }

      listItem.innerHTML = `
        <p><strong>${escapeHtml(error.name)}</strong></p>
        <p>${escapeHtml(error.description)}</p>
        ${error.selector ? `<p>Location: ${error.selector}</p>` : ``}
        ${
          error.selector 
            ? `<button id="highlight-btn-${index}">
                Highlight
                <img src="assets/highlight.svg" alt=""/>
              </button>` 
            : ``
        }
        ${
          error.selector
            ? `<button id="inspect-btn-${index}">
                Inspect
                <img src="assets/highlight.svg" alt=""/>
              </button>` 
            : ``
        }
        ${error.element ? `<pre><code>${escapeHtml(truncateIfTooManyChildren(error.element))}</code></pre>` : ``}
        <p>How to fix: ${error.fix}</p>
        ${wcagLinks 
          ? `${wcagLinks}` 
          : ``
        }
      `;

      if (error.selector) {
        listItem.querySelector(`#highlight-btn-${index}`).addEventListener('click', () => {
          highlightElement(error.selector);
        });

        listItem.querySelector(`#inspect-btn-${index}`).addEventListener('click', () => {
          highlightElementInDevTools(error.selector);
        });
      }

      errorsList.appendChild(listItem);
    });
  }

  async function runAudit(auditFuncs) {
    auditResults = [];
    
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
});