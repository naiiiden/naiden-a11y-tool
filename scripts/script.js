import { updateErrorsCount } from "./ui/update-errors-count.js";
import { displayAuditResults, emptyErrorMessage } from "./ui/display-audit-results.js";
import { uiControls } from "./ui/controls.js";

document.addEventListener("DOMContentLoaded", () => {
  let auditResults = [];

  async function runAudit(auditFuncs) {
    auditResults = [];
    
    try {
      for (const auditFunc of auditFuncs) {
        await auditFunc(auditResults)
      }

      console.log("errors:", auditResults);
      displayAuditResults(auditResults);
      
      if (auditResults.length === 0) {
        emptyErrorMessage("No errors found.");
      }
      
      updateErrorsCount(auditResults);
      
    } catch (err) {
      console.error("Error during audit:", err);
    }
  }

  uiControls(runAudit);
});