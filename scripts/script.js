import { emptyAudit } from "./emptyAudit.js";
import { formAudit } from "./formAudit.js";
import { htmlAndHeadAudit } from "./htmlAndHeadAudit.js";
import { imageLinkAndButtonAudit } from "./imageLinkAndButtonsAudit.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('toggle-stylesheets').addEventListener('change', () => {
    const disable = document.getElementById('toggle-stylesheets').checked;

    chrome.devtools.inspectedWindow.eval(
      `(${toggleStylesheets.toString()})(${disable});`
    );
  });

  document.getElementById('highlight-btn').addEventListener('click', () => {
    chrome.devtools.inspectedWindow.eval(
      `(${highlightElements.toString()})();`
    );
  });

  document.getElementById("start-audit-btn").addEventListener("click", () => {
    runAudit();
  });
});

function toggleStylesheets(disable) {
  const stylesheets = document.styleSheets;
  for (let i = 0; i < stylesheets.length; i++) {
    stylesheets[i].disabled = disable;
  }
}

function highlightElements() {
  const elements = document.querySelectorAll('body *:not(div):not(span)');
  elements.forEach(element => {
    if (element.style.outline == "") {
      element.style.outline = '2px solid red'; 
    } else {
      element.style.outline = "";
    }
  });
}


const errorsList = document.getElementById('errors-list');
function displayAuditResults(auditResults) {
  errorsList.innerHTML = '';

  auditResults.forEach(error => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${error.name}</strong> - ${error.description}<br>
      <a href="${error.wcagLink}" target="_blank">Learn more</a><br>
      <p>Fix: ${error.fix}</p>
    `;
    errorsList.appendChild(listItem);
  });
}

async function runAudit() {
  let auditResults = [];

  try {
    await htmlAndHeadAudit(auditResults);
    await imageLinkAndButtonAudit(auditResults);
    await emptyAudit(auditResults);
    await formAudit(auditResults);

    console.log("errors:", auditResults);
    displayAuditResults(auditResults);
  } catch (err) {
    console.error("Error during audit:", err);
  }
}