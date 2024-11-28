import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasPresentationOrNoneRoleConflict(auditResults) {
    const hasPresentationOrNoneRoleConflict = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        return Array.from(document.querySelectorAll(\`
            :is([role='none'], [role='presentation']):is([tabindex]:not([tabindex^='-'], [tabindex='']), 
                                                         [aria-atomic]:not([aria-atomic='']),
                                                         [aria-busy]:not([aria-busy='']),
                                                         [aria-controls]:not([aria-controls='']),
                                                         [aria-current]:not([aria-current='']),
                                                         [aria-describedby]:not([aria-describedby='']),
                                                         [aria-details]:not([aria-details='']),
                                                         [aria-disabled]:not([aria-disabled='']),
                                                         [aria-dropeffect]:not([aria-dropeffect='']),
                                                         [aria-errormessage]:not([aria-errormessage='']),
                                                         [aria-flowto]:not([aria-flowto='']),
                                                         [aria-grabbed]:not([aria-grabbed='']),
                                                         [aria-haspopup]:not([aria-haspopup='']),
                                                         [aria-hidden]:not([aria-hidden='']),
                                                         [aria-invalid]:not([aria-invalid='']),
                                                         [aria-keyshortcuts]:not([aria-keyshortcuts='']),
                                                         [aria-label]:not([aria-label='']),
                                                         [aria-labelledby]:not([aria-labelledby='']),
                                                         [aria-live]:not([aria-live='']),
                                                         [aria-owns]:not([aria-owns='']),
                                                         [aria-relevant]:not([aria-relevant='']),
                                                         [aria-roledescription]:not([aria-roledescription='']))
        \`))
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element)
            }));
    `) 
    
    hasPresentationOrNoneRoleConflict.forEach(element => {
        auditResults.push({
            ...ariaErrors[22],
            element: element.outerHTML,
            selector: element.selector
        });
    });
}