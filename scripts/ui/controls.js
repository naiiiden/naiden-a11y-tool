import { toggleStylesheets } from "../utils/toggle-stylesheets.js";

export function uiControls(auditFuncsMap, runAudit) {
    const auditCheckboxes = document.querySelectorAll("input[type='checkbox'][id$='checkbox'");
    const selectAllBtn = document.querySelector("input[type='button'][id='select-all']");
    const runAuditBtn = document.querySelector("#run-audit-btn");
    const auditFuncsArray = [];

    document.getElementById('toggle-stylesheets').addEventListener('change', () => {
        const disable = document.getElementById('toggle-stylesheets').checked;
        chrome.devtools.inspectedWindow.eval(
          `(${toggleStylesheets.toString()})(${disable});`
        );
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