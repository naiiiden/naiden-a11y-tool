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

        paginationControls.innerHTML = errorInstances.length > 1 ? `
          <button class="first-btn" aria-label="First error">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M240-240v-480h80v480h-80Zm440 0L440-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
          </button>
          <button class="prev-btn" aria-label="Previous error">
            <svg xmlns="http://www.w3.org/2000/svg" height="14.125px" viewBox="0 -960 960 960" width="14.125px" stroke="#e3e3e3" stroke-width="20"><path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
          </button>
          <span>
            <span id="current-index">
              ${currentIndex + 1}
            </span>  
            of 
            <span>
              ${errorInstances.length}
            </span>
          </span>
          <button class="next-btn" aria-label="Next error">
            <svg xmlns="http://www.w3.org/2000/svg" height="14.125px" viewBox="0 -960 960 960" width="14.125px" stroke="#e3e3e3" stroke-width="20"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
          </button>
          <button class="last-btn" aria-label="Last error">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m280-240-56-56 184-184-184-184 56-56 240 240-240 240Zm360 0v-480h80v480h-80Z"/></svg>
          </button>
        ` : ``;

        const paginationButtons = errorInstances.length > 1 ? {
          firstBtn: paginationControls.querySelector('.first-btn'),
          prevBtn: paginationControls.querySelector('.prev-btn'),
          nextBtn: paginationControls.querySelector('.next-btn'),
          lastBtn: paginationControls.querySelector('.last-btn'),
          currentIndexSpan: paginationControls.querySelector("#current-index")
        } : null;
        
        function updateErrorDisplay() {
          const error = errorInstances[currentIndex];
          
          errorContainer.innerHTML = `
            <h3>${escapeHtml(name)}</h3>
            <p>${escapeHtml(error.description)}</p>
            ${error.selector || error.element ? `<div>
              ${error.selector ?
                `<div>
                  <h4>
                    Location<span aria-hidden="true">:</span>
                  </h4>
                  <p>${error.selector}</p>
                </div>` : ``
              }
              ${error.element ? `<pre><code class="language-html">${escapeHtml(truncateIfTooManyChildren(error.element))}</code></pre>` : ``}
              ${error.selector ? `<div>
                <button id="highlight-btn-${error.type}">
                  Highlight
                  <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"><path d="M444-48v-98q-119-12-202.5-95.5T146-444H48v-72h98q12-119 95.5-203T444-814v-98h72v98q119 11 202.5 95T814-516h98v72h-98q-12 119-95.5 202.5T516-146v98h-72Zm36-168q110 0 187-77t77-187q0-110-77-187t-187-77q-110 0-187 77t-77 187q0 110 77 187t187 77Z"/></svg>
                </button> 
                <button id="inspect-btn-${error.type}">
                  Inspect
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M450-420q38 0 64-26t26-64q0-38-26-64t-64-26q-38 0-64 26t-26 64q0 38 26 64t64 26Zm193 160L538-365q-20 13-42.5 19t-45.5 6q-71 0-120.5-49.5T280-510q0-71 49.5-120.5T450-680q71 0 120.5 49.5T620-510q0 23-6.5 45.5T594-422l106 106-57 56ZM200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm400 0v-80h160v-160h80v160q0 33-23.5 56.5T760-120H600ZM120-600v-160q0-33 23.5-56.5T200-840h160v80H200v160h-80Zm640 0v-160H600v-80h160q33 0 56.5 23.5T840-760v160h-80Z"/></svg>
                </button>
              </div>` : ``}
            </div>
            <div>
              <h4>
                How to fix<span aria-hidden="true">:</span>
              </h4>
              <p>${error.fix}</p>
            </div>` : ``}
            ${error.wcagLinks && 
              `<details>
                <summary>
                  Learning and helpful resources
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m288-384 192-192 192 192H288Z"/></svg>
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

          if (errorInstances.length > 1 && paginationButtons) {
            if (currentIndex === 0) {
              paginationButtons.firstBtn.disabled = true;
              paginationButtons.prevBtn.disabled = true;
              paginationButtons.nextBtn.disabled = false;
              paginationButtons.lastBtn.disabled = false;
            } else if (currentIndex === errorInstances.length - 1) {
              paginationButtons.firstBtn.disabled = false;
              paginationButtons.prevBtn.disabled = false;
              paginationButtons.nextBtn.disabled = true;
              paginationButtons.lastBtn.disabled = true;
            } else {
              paginationButtons.firstBtn.disabled = false;
              paginationButtons.prevBtn.disabled = false;
              paginationButtons.nextBtn.disabled = false;
              paginationButtons.lastBtn.disabled = false;
            }

            paginationButtons.currentIndexSpan.textContent = currentIndex + 1;
          }   
        }

        if (errorInstances.length > 1 && paginationButtons) {
          paginationButtons.prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
              currentIndex--;
              updateErrorDisplay();
              hljs.highlightAll();
            }
          });
          
          paginationButtons.nextBtn.addEventListener('click', () => {
            if (currentIndex < errorInstances.length - 1) {
              currentIndex++;
              updateErrorDisplay();
              hljs.highlightAll();
            }
          });
          
          paginationButtons.firstBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
              currentIndex = 0;
              updateErrorDisplay();
              hljs.highlightAll();
            }
          });
          
          paginationButtons.lastBtn.addEventListener("click", () => {
            if (currentIndex < errorInstances.length - 1) {
              currentIndex = errorInstances.length - 1;
              updateErrorDisplay();
              hljs.highlightAll();
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

    hljs.highlightAll();
}