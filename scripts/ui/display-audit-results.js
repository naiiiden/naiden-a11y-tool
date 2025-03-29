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
        const sanitizedId = name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
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
                <button id="highlight-btn-${sanitizedId}">
                  Highlight
                  <img src="assets/highlight.svg" alt=""/>
                </button> 
                <button id="inspect-btn-${sanitizedId}">
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

            ${errorInstances.length > 1 && `
              <div class="pagination-controls">
                <button id="prev-btn-${sanitizedId}" ${currentIndex === 0 ? 'disabled' : ''}>&lt; Prev</button>
                <span>Instance ${currentIndex + 1} of ${errorInstances.length}</span>
                <button id="next-btn-${sanitizedId}" ${currentIndex === errorInstances.length - 1 ? 'disabled' : ''}>Next &gt;</button>
              </div>
            `}
          `;
          
          if (error.selector) {
            listItem.querySelector(`#highlight-btn-${sanitizedId}`).addEventListener('click', () => {
              highlightElement(error.selector);
            });

            listItem.querySelector(`#inspect-btn-${sanitizedId}`).addEventListener('click', () => {
              highlightElementInDevTools(error.selector);
            });
          }

          if (errorInstances.length > 1) {
            listItem.querySelector(`#prev-btn-${sanitizedId}`).addEventListener('click', () => {
              if (currentIndex > 0) {
                currentIndex--;
                updateErrorDisplay();
              }
            });

            listItem.querySelector(`#next-btn-${sanitizedId}`).addEventListener('click', () => {
              if (currentIndex < errorInstances.length - 1) {
                currentIndex++;
                updateErrorDisplay();
              }
            });
          }
        }

        updateErrorDisplay();
        typeErrorsList.appendChild(listItem);
      })
      
      // errors.forEach((error, index) => {
      //   const listItem = document.createElement('li');
      //   listItem.id = `${type}-error-${index}`;

      //   let wcagLinks = '';
      //   if (error.wcagLinks) {
      //     for (const wcagLink of error.wcagLinks) {
      //       wcagLinks += `
      //         <li>
      //           <a href="${wcagLink.url}" target="_blank">
      //             ${wcagLink.name} <img src="assets/open-in-new.svg" alt="(opens in a new tab)"/>
      //           </a>
      //         </li>
      //       `;
      //     }
      //   }

      //   listItem.innerHTML = `
      //     <h3>${escapeHtml(error.name)}</h3>
      //     <p>${escapeHtml(error.description)}</p>
      //     <div>
      //       ${error.selector && 
      //         `<div>
      //           <h4>
      //             Location<span aria-hidden="true">:</span>
      //           </h4>
      //           <p>${error.selector}</p>
      //         </div>`
      //       }
      //       ${error.element && `<pre><code class="language-html">${escapeHtml(truncateIfTooManyChildren(error.element))}</code></pre>`}
      //       ${error.selector && `<div>
      //         <button id="highlight-btn-${index}">
      //           Highlight
      //           <img src="assets/highlight.svg" alt=""/>
      //         </button> 
      //         <button id="inspect-btn-${index}">
      //           Inspect
      //           <img src="assets/inspect.svg" alt=""/>
      //         </button>
      //       </div>`}
      //     </div>
      //     <div>
      //       <h4>
      //         How to fix<span aria-hidden="true">:</span>
      //       </h4>
      //       <p>${error.fix}</p>
      //     </div>
      //     ${wcagLinks && 
      //       `<details>
      //         <summary>
      //           Learning and helpful resources
      //           <img src="assets/arrow.svg" alt=""/>
      //         </summary>
      //         <ul>${wcagLinks}</ul>
      //       </details>`
      //     }
      //   `;

      //   if (error.selector) {
      //     listItem.querySelector(`#highlight-btn-${index}`).addEventListener('click', () => {
      //       highlightElement(error.selector);
      //     });

      //     listItem.querySelector(`#inspect-btn-${index}`).addEventListener('click', () => {
      //       highlightElementInDevTools(error.selector);
      //     });
      //   }

      //   typeErrorsList.appendChild(listItem);
      // });
      
      typeSection.appendChild(typeErrorsList);
      errorsList.appendChild(typeSection);
    }

    document.querySelectorAll('pre code').forEach((block) => {
      Prism.highlightElement(block);
    });
}