import { displayAuditResults, emptyErrorMessage } from "./display-audit-results.js";

export async function runAudit(auditFuncs) {
    const auditResults = [];
    
    if (auditResults.length === 0) {
        emptyErrorMessage("No errors found.");
    }  

    try {
      for (const auditFunc of auditFuncs) {
        await auditFunc(auditResults)
      }

      displayAuditResults(auditResults);
    } catch (err) {
      console.error("Error during audit:", err);
    }
  }