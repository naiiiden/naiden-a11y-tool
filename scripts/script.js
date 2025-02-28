import { emptyAudit } from "./audits/empty-elements-audit/empty-audit.js";
import { formAudit } from "./audits/form-audit/form-audit.js";
import { embeddedElementsAudit } from "./audits/embedded-elements-audit/embedded-elements-audit.js";
import { rootAndMetadataAudit } from "./audits/root-and-metadata-audit/root-and-metadata-audit.js";
import { imagesAudit } from "./audits/images-audit/images-audit.js";
import { interactiveElementsAudit } from "./audits/interactive-elements-audit/interactive-elements-audit.js";
import { semanticAudit } from "./audits/semantic-audit/semantic-audit.js";
import { ariaAudit } from "./audits/aria-audit/aria-audit.js";
import { cssAudit } from "./audits/css-audit/css-audit.js";
import { deprecatedElementsAudit } from "./audits/deprecated-elements-audit/deprecated-elements-audit.js";
import { colourAudit } from "./audits/colour-audit/colour-audit.js";
import { updateErrorsCount } from "./ui/update-errors-count.js";
import { displayAuditResults, emptyErrorMessage } from "./ui/display-audit-results.js";
import { uiControls } from "./ui/controls.js";

document.addEventListener("DOMContentLoaded", () => {
  const auditFuncsMap = {
    "root-and-metadata": rootAndMetadataAudit,
    "image": imagesAudit,
    "interactive-elements": interactiveElementsAudit,
    "empty-elements": emptyAudit,
    "form": formAudit,
    "embedded-elements": embeddedElementsAudit,
    "semantic": semanticAudit,
    "aria": ariaAudit,
    "css": cssAudit,
    "deprecated-elements": deprecatedElementsAudit,
    "colour": colourAudit
  };
  
  let auditResults = [];

  async function runAudit(auditFuncs) {
    auditResults = [];
    
    try {
      for (const auditFunc of auditFuncs) {
        await auditFunc(auditResults)
      }

      console.log("errors:", auditResults);
      displayAuditResults(auditResults);
    } catch (err) {
      console.error("Error during audit:", err);
    }
  }

  uiControls(auditFuncsMap, runAudit);
});