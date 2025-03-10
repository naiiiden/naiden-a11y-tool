import { displayErrorsCount } from "./ui/display-errors-count.js";
import { displayAuditResults, emptyErrorMessage } from "./ui/display-audit-results.js";
import { showLoading, hideLoading } from "./ui/display-loading-indicator.js";
import { uiControls } from "./ui/controls.js";

document.addEventListener("DOMContentLoaded", () => {
  let auditResults = [];

  async function runAudit(auditFuncs) {
    auditResults = [];
    
    try {
      showLoading();

      for (const auditFunc of auditFuncs) {
        await auditFunc(auditResults)
      }

      console.log("errors:", auditResults);
      displayAuditResults(auditResults);
      
      if (auditResults.length === 0) {
        emptyErrorMessage("No errors found.");
      }
      
      displayErrorsCount(auditResults);
      
    } catch (err) {
      console.error("Error during audit:", err);
    } finally {
      hideLoading();
    }
  }

  uiControls(runAudit);
});