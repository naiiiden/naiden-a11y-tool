import { toggleStylesheets } from "../utils/toggle-stylesheets.js";
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

export function uiControls(runAudit) {
    const auditCheckboxes = document.querySelectorAll("input[type='checkbox'][id$='checkbox'");
    const selectAllBtn = document.querySelector("input[type='button'][id='select-all']");
    const runAuditBtn = document.querySelector("#run-audit-btn");
    const openAuditCheckboxesDropdownBtn = document.querySelector("#open-audit-checkboxes-dropdown-button");
    const auditFuncsArray = [];
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

    document.getElementById('toggle-stylesheets').addEventListener('change', () => {
        const disable = document.getElementById('toggle-stylesheets').checked;
        chrome.devtools.inspectedWindow.eval(
          `(${toggleStylesheets.toString()})(${disable});`
        );
    });

    openAuditCheckboxesDropdownBtn.addEventListener("click", () => {
        document.querySelector(".audit-checkboxes-container").classList.toggle("open");
        openAuditCheckboxesDropdownBtn.classList.toggle("open");
    });

    auditCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
        const selectedAudit = auditFuncsMap[checkbox.value];
        auditFuncsArray.push(selectedAudit);
    });
    
    function updateSelectAllButton() {
        const allCheckboxesChecked = Array.from(auditCheckboxes).every(checkbox => checkbox.checked);
        selectAllBtn.value = allCheckboxesChecked ? "deselect all" : "select all";  
    }
    
    function updateRunButton() {
        const someCheckboxesChecked = Array.from(auditCheckboxes).some(checkbox => checkbox.checked);
        runAuditBtn.disabled = someCheckboxesChecked ? false : true;
    }
    
    updateRunButton();
    updateSelectAllButton();
      
    auditCheckboxes.forEach(input => {
        input.addEventListener("click", (e) => {
            const selectedAudit = auditFuncsMap[e.target.value];

            if (!auditFuncsArray.includes(selectedAudit)) {
                auditFuncsArray.push(selectedAudit);
            } else if (auditFuncsArray.includes(e.target.value)) {
                auditFuncsArray.splice(auditFuncsArray.indexOf(selectedAudit), 1);
            }

            updateSelectAllButton();
            updateRunButton();
        });
    });

    selectAllBtn.addEventListener('click', () => {
        const allCheckboxesChecked = Array.from(auditCheckboxes).every(checkbox => checkbox.checked);
    
        if (!allCheckboxesChecked) {
            auditCheckboxes.forEach(input => {
                input.checked = true;
                const selectedAudit = auditFuncsMap[input.value];
    
                if (!auditFuncsArray.includes(selectedAudit)) {
                    auditFuncsArray.push(selectedAudit);
                }
            });
        } else if (allCheckboxesChecked) {
            auditCheckboxes.forEach(input => {
                input.checked = false;
                const selectedAudit = auditFuncsMap[input.value];
                
                if (auditFuncsArray.includes(selectedAudit)) {
                    auditFuncsArray.splice(auditFuncsArray.indexOf(selectedAudit), 1);
                }
            });
        }
    
        updateSelectAllButton();
        updateRunButton();
    });

    runAuditBtn.addEventListener("click", async () => {
        await runAudit(auditFuncsArray);
    });
    
    return auditFuncsArray;
}