import { escapeHtml } from "../utils/escape-html.js";
import { highlightElement } from "../utils/highlight-element.js";
import { highlightElementInDevTools } from "../utils/highlight-element-in-dev-tools.js";
import { truncateIfTooManyChildren } from "../utils/truncate-if-too-many-children.js";
import { checkOverflow } from "./main-has-overflow.js";

const errorsIndicator = document.getElementById("errors-indicator");
const errorsList = document.getElementById('errors-list');

export function displayAuditResults(auditResults) {
    errorsList.innerHTML = '';
    errorsIndicator.innerHTML = "";

    if (auditResults.length > 0) {
      const globalToggleButton = document.createElement("button");
      globalToggleButton.className = "toggle-all-btn";
      globalToggleButton.textContent = "Collapse All";
      errorsList.appendChild(globalToggleButton);
  
      let allExpanded = true;
  
      globalToggleButton.addEventListener("click", () => {
        document.querySelectorAll(".custom-summary").forEach((summary) => {
          const container = summary.parentElement;
          const content = container.querySelector(".custom-content");
  
          if (allExpanded) {
            container.classList.remove("open");
            content.inert = true;
            summary.setAttribute("aria-expanded", "false");
            content.style.maxHeight = "0";
          } else {
            container.classList.add("open");
            content.inert = false;
            summary.setAttribute("aria-expanded", "true");
            content.style.maxHeight = `fit-content`;
          }
        });
  
        allExpanded = !allExpanded;
        globalToggleButton.textContent = allExpanded ? "Collapse All" : "Expand All";
        requestAnimationFrame(() => {
          setTimeout(() => (
            checkOverflow()
          ), 300);
        });
      });
    }

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
      const typeSection = document.createElement('div');
      typeSection.id = `${type}`;
      typeSection.classList.add("open", "custom-details");

      const summary = document.createElement("button");
      summary.classList.add("custom-summary");
      summary.setAttribute("aria-expanded", "true");
      const formattedType = type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + ' Errors';
      summary.innerHTML = `${formattedType} <img class="icon" src="assets/arrow.svg" alt=""/>`;

      const content = document.createElement("div");
      content.classList.add("custom-content");

      const typeErrorsList = document.createElement('ul');
      
      Object.entries(errorsByName).forEach(([name, errorInstances], errorIndex) => {
        const listItem = document.createElement('li');
        const errorContainer = document.createElement('div');
        const paginationControls = document.createElement("div");
        paginationControls.classList.add("error-pagination-controls")
        let currentIndex = 0;

        paginationControls.innerHTML = errorInstances.length > 1 ? `
          <button class="first-btn" aria-label="First error"><img class="icon" src="assets/first.svg" alt=""/></button>
          <button class="prev-btn" aria-label="Previous error"><img class="icon" src="assets/back.svg" alt=""/></button>
          <span>
            <span id="current-index">
              ${currentIndex + 1}
            </span>  
            of 
            <span>
              ${errorInstances.length}
            </span>
          </span>
          <button class="next-btn" aria-label="Next error"><img class="icon" src="assets/forward.svg" alt=""/></button>
          <button class="last-btn" aria-label="Last error"><img class="icon" src="assets/last.svg" alt=""/></button>
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
            <h3>${errorIndex + 1}.${currentIndex + 1}. ${escapeHtml(name)}</h3>
            <p>${escapeHtml(error.description)}</p>
            ${error.selector || error.element ? `<div class="element-information">
              ${error.selector ?
                `<div class="element-location">
                  <h4>
                    Location<span aria-hidden="true">:</span>
                  </h4>
                  <p>${error.selector}</p>
                </div>` : ``
              }
              ${error.element ? `<pre><code class="language-html">${escapeHtml(truncateIfTooManyChildren(error.element))}</code></pre>` : ``}
              ${error.selector ? `<div class="element-buttons">
                <button id="highlight-btn-${error.type}">
                  Highlight
                  <img class="icon" src="assets/highlight.svg" alt=""/>
                </button> 
                <button id="inspect-btn-${error.type}">
                  Inspect
                  <img class="icon" src="assets/inspect.svg" alt=""/>
                </button>
              </div>` : ``}
            </div>` : ``}
            <div class="element-fix">
              <h4>
                How to Fix<span aria-hidden="true">:</span>
              </h4>
              <p>${error.fix}</p>
            </div>
            ${error.wcagLinks && 
              `<details>
                <summary>
                  Learning and Helpful Resources
                  <img class="icon" src="assets/arrow.svg" alt=""/>
                </summary>
                <ul>
                  ${error.wcagLinks.map(link => `
                    <li>
                      <a class="external-link" href="${link.url}" target="_blank">
                        ${link.name} <img class="icon" src="assets/open-in-new.svg" alt="(opens in a new tab)"/>
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

        function rehighlightCode() {
          const codeBlock = errorContainer.querySelector("pre code");
          if (codeBlock) {
            hljs.highlightElement(codeBlock);
          } 
        }

        if (errorInstances.length > 1 && paginationButtons) {
          paginationButtons.prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
              currentIndex--;
              updateErrorDisplay();
              rehighlightCode();
            }
          });
          
          paginationButtons.nextBtn.addEventListener('click', () => {
            if (currentIndex < errorInstances.length - 1) {
              currentIndex++;
              updateErrorDisplay();
              rehighlightCode();
            }
          });
          
          paginationButtons.firstBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
              currentIndex = 0;
              updateErrorDisplay();
              rehighlightCode();
            }
          });
          
          paginationButtons.lastBtn.addEventListener("click", () => {
            if (currentIndex < errorInstances.length - 1) {
              currentIndex = errorInstances.length - 1;
              updateErrorDisplay();
              rehighlightCode();
            }
          });
        }

        updateErrorDisplay();
        listItem.appendChild(errorContainer);
        if (errorInstances.length > 1) {
          listItem.appendChild(paginationControls);
        }
        typeErrorsList.appendChild(listItem);
      })
      
      content.appendChild(typeErrorsList);
      typeSection.appendChild(summary);
      typeSection.appendChild(content);
      errorsList.appendChild(typeSection);
    }

    hljs.highlightAll();

    document.querySelectorAll(".custom-summary").forEach((summary) => {
      const container = summary.parentElement;
      const content = container.querySelector(".custom-content");
  
      summary.setAttribute("aria-expanded", "true");
      container.classList.add("open");
      content.style.maxHeight = 'fit-content';
      content.inert = false;

      summary.addEventListener("click", () => {
        const isOpen = container.classList.toggle("open");
        summary.setAttribute("aria-expanded", isOpen);
        content.style.maxHeight = isOpen ? `fit-content` : "0";
        content.inert = isOpen ? false : true;

        requestAnimationFrame(() => {
          setTimeout(() => (
            checkOverflow()
          ), 300);
        });

        const customDetails = document.querySelectorAll(".custom-details");
        const allAreOpen = Array.from(customDetails).every(detail =>
          detail.classList.contains("open")
        );
        const allAreClosed = Array.from(customDetails).every(detail =>
          !detail.classList.contains("open")
        );

        if (allAreOpen) {
          globalToggleButton.textContent = "Collapse All";
          allExpanded = true;
        } else if (allAreClosed) {
          globalToggleButton.textContent = "Expand All";
          allExpanded = false;
        }   
      });
    });
}