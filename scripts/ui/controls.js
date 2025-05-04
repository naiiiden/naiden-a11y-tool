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
import { inspectedWindowEval } from "../utils/inspected-window-eval.js";

export function uiControls(runAudit) {
    const auditCheckboxes = document.querySelectorAll("input[type='checkbox'][id$='checkbox']");
    const selectAllBtn = document.querySelector("button[type='submit'][id='select-all']");
    const runAuditBtn = document.querySelector("#run-audit-btn");
    const openAuditCheckboxesDropdownBtn = document.querySelector("#open-audit-checkboxes-dropdown-button");
    const auditCheckboxesDropdown = document.querySelector(".audit-checkboxes-container");
    const auditFuncsArray = [];
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

    document.getElementById('toggle-stylesheets').addEventListener('change', () => {
        const disable = document.getElementById('toggle-stylesheets').checked;
        inspectedWindowEval(`
            (${toggleStylesheets.toString()})(${disable});
        `)
    });

    openAuditCheckboxesDropdownBtn.addEventListener("click", () => {
        document.querySelector(".audit-checkboxes-container").classList.toggle("open");
        openAuditCheckboxesDropdownBtn.querySelector("img").classList.toggle("open");
    });

    document.addEventListener("click", (event) => {
        if (!auditCheckboxesDropdown.contains(event.target) && !openAuditCheckboxesDropdownBtn.contains(event.target)) {
            auditCheckboxesDropdown.classList.remove("open");
            openAuditCheckboxesDropdownBtn.querySelector("img").classList.remove("open");
        }
    });

    document.addEventListener("focusin", (event) => {
        if (auditCheckboxesDropdown.classList.contains("open") && 
            !auditCheckboxesDropdown.contains(event.target) && 
            !openAuditCheckboxesDropdownBtn.contains(event.target)) {
            
            auditCheckboxesDropdown.classList.remove("open");
            openAuditCheckboxesDropdownBtn.querySelector("img").classList.remove("open");
        }
    });

    auditCheckboxes.forEach(checkbox => {
        checkbox.checked = true;
        const selectedAudit = auditFuncsMap[checkbox.value];
        auditFuncsArray.push(selectedAudit);
    });
    
    function updateSelectAllButton() {
        const allCheckboxesChecked = Array.from(auditCheckboxes).every(checkbox => checkbox.checked);
        selectAllBtn.textContent = allCheckboxesChecked ? "Deselect All" : "Select All";  
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
            } else if (auditFuncsArray.includes(selectedAudit)) {
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
        runAuditBtn.textContent = "Rerun Audit";
    });    
    
    return auditFuncsArray;
}

export function attachErrorSectionAnchorHighlights() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            const target = document.querySelector(anchor.getAttribute("href"));
            if (target) {
                target.classList.add("highlight", "open");
                target.children[1].style.maxHeight = "fit-content";
                target.open = true;
                setTimeout(() => target.classList.remove("highlight"), 2000);
            }
        });
    });
}