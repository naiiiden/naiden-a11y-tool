import { emptyAudit } from "../audits/empty-elements-audit/empty-audit.js";
import { formAudit } from "../audits/form-audit/form-audit.js";
import { embeddedElementsAudit } from "../audits/embedded-elements-audit/embedded-elements-audit.js";
import { rootAndMetadataAudit } from "../audits/root-and-metadata-audit/root-and-metadata-audit.js";
import { imagesAudit } from "../audits/images-audit/images-audit.js";
import { interactiveElementsAudit } from "../audits/interactive-elements-audit/interactive-elements-audit.js";
import { semanticAudit } from "../audits/semantic-audit/semantic-audit.js";
import { ariaAudit } from "../audits/aria-audit/aria-audit.js";
import { cssAudit } from "../audits/css-audit/css-audit.js";
import { deprecatedElementsAudit } from "../audits/deprecated-elements-audit/deprecated-elements-audit.js";
import { colourAudit } from "../audits/colour-audit/colour-audit.js";

export function displayAuditCheckboxes() {
  // prettier-ignore
  const auditFuncsMap = {
    "root-and-metadata": rootAndMetadataAudit,
    "semantic": semanticAudit,
    "aria": ariaAudit,
    "deprecated-elements": deprecatedElementsAudit,
    "empty-elements": emptyAudit,
    "interactive-elements": interactiveElementsAudit,
    "embedded-elements": embeddedElementsAudit,
    "form": formAudit,
    "image": imagesAudit,
    "css": cssAudit,
    "colour": colourAudit
  };

  const auditCheckboxesDropdown = document.querySelector(".audit-checkboxes-container");

  Object.keys(auditFuncsMap).forEach((key) => {
    const label = document.createElement("label");
    const formattedName = key
      .split("-")
      .map((word) => {
        if (word === "aria") return "ARIA";
        if (word === "css") return "CSS";
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
    const input = document.createElement("input");

    input.type = "checkbox";
    input.id = `${key}-audit-checkbox`;
    input.value = key;

    label.setAttribute("for", input.id);
    label.textContent = formattedName;
    label.appendChild(input);
    auditCheckboxesDropdown.insertBefore(
      label,
      document.querySelector("button[type='submit'][id='select-all']")
    );
  });
}
