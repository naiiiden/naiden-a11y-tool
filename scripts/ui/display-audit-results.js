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
      const image = document.createElement('img');
      image.src = "assets/arrow.svg";
      image.alt = "";
      typeHeading.appendChild(image);
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
          <h3>${escapeHtml(error.name)}</h3>
          <p>${escapeHtml(error.description)}</p>
          <div>
            ${error.selector && `<p>Location: ${error.selector}</p>`}
            ${error.element && `<pre><code class="language-html">${escapeHtml(truncateIfTooManyChildren(error.element))}</code></pre>`}
            ${error.selector && `<div>
              <button id="highlight-btn-${index}">
                Highlight
                <img src="assets/highlight.svg" alt=""/>
              </button> 
              <button id="inspect-btn-${index}">
                Inspect
                <img src="assets/inspect.svg" alt=""/>
              </button>
            </div>`}
          </div>
          <p>How to fix: ${error.fix}</p>
          ${wcagLinks && `<p>Learning resources:</p>`}
          ${wcagLinks && `<ul>${wcagLinks}</ul>`}
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

    document.querySelectorAll('pre code').forEach((block) => {
      Prism.highlightElement(block);
    });
}