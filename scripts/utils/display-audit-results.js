export function displayAuditResults(auditResults) {
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