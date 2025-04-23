import { displayErrorsCount } from "./ui/display-errors-count.js";
import { displayAuditResults } from "./ui/display-audit-results.js";
import { showLoading, hideLoading } from "./ui/display-loading-indicator.js";
import { attachErrorSectionAnchorHighlights, uiControls } from "./ui/controls.js";
import { checkOverflow } from "./ui/main-has-overflow.js";
import { statusMessage } from "./ui/status-message.js";

document.addEventListener("DOMContentLoaded", () => {
  let auditResults = [];

  statusMessage("Found errors will appear here.");

  async function runAudit(auditFuncs) {
    auditResults = [];
    
    try {
      const errorsList = document.getElementById("errors-list");
      const errorsCountContainer = document.getElementById("errors-count-container");
      const errorsIndicator = document.getElementById("errors-indicator");

      if (errorsList) {
        errorsList.textContent = "";
      }
      if (errorsCountContainer) {
        errorsCountContainer.style.display = "none";
      }
      if (errorsIndicator) {
        errorsIndicator.textContent = "";
      }

      showLoading();

      for (const auditFunc of auditFuncs) {
        await auditFunc(auditResults)
      }

      console.log("errors:", auditResults);
      displayAuditResults(auditResults);
      
      if (auditResults.length === 0) {
        statusMessage("No errors found.");
      }
      
      displayErrorsCount(auditResults);
      attachErrorSectionAnchorHighlights();
      
    } catch (err) {
      console.error("Error during audit:", err);
    } finally {
      hideLoading();
      checkOverflow();
    }
  }

  uiControls(runAudit);
});