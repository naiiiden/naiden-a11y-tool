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
        const errorContainer = document.createElement('div');
        const paginationControls = document.createElement("div");
        let currentIndex = 0;
        
        function updateErrorDisplay() {
          const error = errorInstances[currentIndex];
          
          errorContainer.innerHTML = `
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
          `;
          
          if (error.selector) {
            errorContainer.querySelector(`#highlight-btn-${error.type}`).addEventListener('click', () => {
              highlightElement(error.selector);
            });

            errorContainer.querySelector(`#inspect-btn-${error.type}`).addEventListener('click', () => {
              highlightElementInDevTools(error.selector);
            });
          };

          if (errorInstances.length > 1) {
            if (currentIndex === 0) {
              paginationControls.querySelector('.first-btn').disabled = true;
              paginationControls.querySelector('.prev-btn').disabled = true;
              paginationControls.querySelector('.next-btn').disabled = false;
              paginationControls.querySelector('.last-btn').disabled = false;
            } else if (currentIndex === errorInstances.length - 1) {
              paginationControls.querySelector('.first-btn').disabled = false;
              paginationControls.querySelector('.prev-btn').disabled = false;
              paginationControls.querySelector('.next-btn').disabled = true;
              paginationControls.querySelector('.last-btn').disabled = true;
            } else {
              paginationControls.querySelector('.first-btn').disabled = false;
              paginationControls.querySelector('.prev-btn').disabled = false;
              paginationControls.querySelector('.next-btn').disabled = false;
              paginationControls.querySelector('.last-btn').disabled = false;
            }
          }          

          const currentIndexSpan = paginationControls.querySelector('#current-index');
          if (currentIndexSpan) {
            currentIndexSpan.textContent = currentIndex + 1;
          }
        }

        paginationControls.innerHTML = errorInstances.length > 1 ? `
            <button class="first-btn" aria-label="First error"><img src="assets/first.svg" alt=""/></button>
            <button class="prev-btn" aria-label="Previous error"><img src="assets/back.svg" alt=""/></button>
            <span>
              <span id="current-index">
                ${currentIndex + 1}
              </span>  
              of 
              <span>
                ${errorInstances.length}
              </span>
            </span>
            <button class="next-btn" aria-label="Next error"><img src="assets/forward.svg" alt=""/></button>
            <button class="last-btn" aria-label="Last error"><img src="assets/last.svg" alt=""/></button>
        ` : ``;

        if (errorInstances.length > 1) {
          paginationControls.querySelector(".prev-btn").addEventListener('click', () => {
            if (currentIndex > 0) {
              currentIndex--;
              updateErrorDisplay();
              prismHighlightElement();
            }
          });
          
          paginationControls.querySelector(".next-btn").addEventListener('click', () => {
            if (currentIndex < errorInstances.length - 1) {
              currentIndex++;
              updateErrorDisplay();
              prismHighlightElement();
            }
          });
          
          paginationControls.querySelector(".first-btn").addEventListener("click", () => {
            if (currentIndex > 0) {
              currentIndex = 0;
              updateErrorDisplay();
              prismHighlightElement();
            }
          });
          
          paginationControls.querySelector(".last-btn").addEventListener("click", () => {
            if (currentIndex < errorInstances.length - 1) {
              currentIndex = errorInstances.length - 1;
              updateErrorDisplay();
              prismHighlightElement();
            }
          });
        }

        updateErrorDisplay();
        listItem.appendChild(errorContainer);
        listItem.appendChild(paginationControls);
        typeErrorsList.appendChild(listItem);
      })
      
      typeSection.appendChild(typeErrorsList);
      errorsList.appendChild(typeSection);
    }

    prismHighlightElement();
}