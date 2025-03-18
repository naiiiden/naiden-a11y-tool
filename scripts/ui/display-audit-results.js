import { escapeHtml } from "../utils/escape-html.js";
import { highlightElement } from "../utils/highlight-element.js";
import { highlightElementInDevTools } from "../utils/highlight-element-in-dev-tools.js";
import { truncateIfTooManyChildren } from "../utils/truncate-if-too-many-children.js";

const errorsIndicator = document.getElementById("errors-indicator");
const errorsList = document.getElementById('errors-list');

export function emptyErrorMessage(text) {
    if (errorsList.innerHTML === "") {
      errorsIndicator.innerHTML = text;
      return;
    }
}

export function displayAuditResults(auditResults) {
    errorsList.innerHTML = '';
    errorsIndicator.innerHTML = "";

    const errorsByType = {};
  
    auditResults.forEach(error => {
      if (!errorsByType[error.type]) {
        errorsByType[error.type] = [];
      }
      errorsByType[error.type].push(error);
    });
  
    for (const [type, errors] of Object.entries(errorsByType)) {
      const typeSection = document.createElement('details');
      typeSection.id = `${type}`;
      typeSection.open = true;
      
      const typeHeading = document.createElement('summary');
      const formattedType = type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' Errors';
      typeHeading.textContent = formattedType;
      typeSection.appendChild(typeHeading);
      
      const typeErrorsList = document.createElement('ul');
      
      errors.forEach((error, index) => {
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
          ${wcagLinks && `<p>Learning resources:</p>`}
          ${wcagLinks 
            ? `<ul>${wcagLinks}</ul>` 
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

        typeErrorsList.appendChild(listItem);
      });
      
      typeSection.appendChild(typeErrorsList);
      errorsList.appendChild(typeSection);
    }  
}