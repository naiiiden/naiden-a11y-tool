import { escapeHtml } from "../utils/escape-html.js";
import { highlightElement } from "../utils/highlight-element.js";
import { highlightElementInDevTools } from "../utils/highlight-element-in-dev-tools.js";
import { truncateIfTooManyChildren } from "../utils/truncate-if-too-many-children.js";
import { prismHighlightElement } from "../utils/prism-highlight.js";

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
        errorsByType[error.type] = {};
      }

      if (!errorsByType[error.type][error.name]) {
        errorsByType[error.type][error.name] = [];
      }
      
      errorsByType[error.type][error.name].push(error);
    });
  
    for (const [type, errorsByName] of Object.entries(errorsByType)) {
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
      
      Object.entries(errorsByName).forEach(([name, errorInstances]) => {
        const listItem = document.createElement('li');
        let currentIndex = 0;
        
        function updateErrorDisplay() {
          const error = errorInstances[currentIndex];
          
          listItem.innerHTML = `
            <h3>${escapeHtml(name)}</h3>
            <p>${escapeHtml(error.description)}</p>
            <div>
              ${error.selector && 
                `<div>
                  <h4>
                    Location<span aria-hidden="true">:</span>
                  </h4>
                  <p>${error.selector}</p>
                </div>`
              }
              ${error.element && `<pre><code class="language-html">${escapeHtml(truncateIfTooManyChildren(error.element))}</code></pre>`}
              ${error.selector && `<div>
                <button id="highlight-btn-${error.type}">
                  Highlight
                  <img src="assets/highlight.svg" alt=""/>
                </button> 
                <button id="inspect-btn-${error.type}">
                  Inspect
                  <img src="assets/inspect.svg" alt=""/>
                </button>
              </div>`}
            </div>
            <div>
              <h4>
                How to fix<span aria-hidden="true">:</span>
              </h4>
              <p>${error.fix}</p>
            </div>
            ${error.wcagLinks && 
              `<details>
                <summary>
                  Learning and helpful resources
                  <img src="assets/arrow.svg" alt=""/>
                </summary>
                <ul>
                  ${error.wcagLinks.map(link => `
                    <li>
                      <a href="${link.url}" target="_blank">
                        ${link.name} <img src="assets/open-in-new.svg" alt="(opens in a new tab)"/>
                      </a>
                    </li>
                  `).join('')}
                </ul>
              </details>`
            }

            ${errorInstances.length > 1 ? `
              <div class="pagination-controls">
                <button id="first-btn-${error.type}" ${currentIndex === 0 ? 'disabled' : ''}><img src="assets/first.svg" alt=""/></button>
                <button id="prev-btn-${error.type}" ${currentIndex === 0 ? 'disabled' : ''}><img src="assets/back.svg" alt=""/></button>
                <span>${currentIndex + 1} of ${errorInstances.length}</span>
                <button id="next-btn-${error.type}" ${currentIndex === errorInstances.length - 1 ? 'disabled' : ''}><img src="assets/forward.svg" alt=""/></button>
                <button id="last-btn-${error.type}" ${currentIndex === errorInstances.length - 1 ? 'disabled' : ''}><img src="assets/last.svg" alt=""/></button>
              </div>
            ` : ``}
          `;
          
          if (error.selector) {
            listItem.querySelector(`#highlight-btn-${error.type}`).addEventListener('click', () => {
              highlightElement(error.selector);
            });

            listItem.querySelector(`#inspect-btn-${error.type}`).addEventListener('click', () => {
              highlightElementInDevTools(error.selector);
            });
          }

          if (errorInstances.length > 1) {
            listItem.querySelector(`#prev-btn-${error.type}`).addEventListener('click', () => {
              if (currentIndex > 0) {
                currentIndex--;
                updateErrorDisplay();
                prismHighlightElement();
              }
            });

            listItem.querySelector(`#next-btn-${error.type}`).addEventListener('click', () => {
              if (currentIndex < errorInstances.length - 1) {
                currentIndex++;
                updateErrorDisplay();
                prismHighlightElement();
              }
            });

            listItem.querySelector(`#first-btn-${error.type}`).addEventListener("click", () => {
              if (currentIndex > 0) {
                currentIndex = 0;
                updateErrorDisplay();
                prismHighlightElement();
              }
            });

            listItem.querySelector(`#last-btn-${error.type}`).addEventListener("click", () => {
              if (currentIndex < errorInstances.length - 1) {
                currentIndex = errorInstances.length - 1;
                updateErrorDisplay();
                prismHighlightElement();
              }
            });
          }
        }

        updateErrorDisplay();
        typeErrorsList.appendChild(listItem);
      })
      
      typeSection.appendChild(typeErrorsList);
      errorsList.appendChild(typeSection);
    }

    prismHighlightElement();
}