import { semanticErrors } from "../../../errors/semantic.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export async function hasMoreThanOneContentinfoLandmark(auditResults) {
    const moreThanOneContentinfoLandmark = await inspectedWindowEval(`
        const isElementVisible = ${isElementVisible.toString()};

        return Array.from(document.querySelectorAll("[role='contentinfo']"))
            .filter(contentinfo => isElementVisible(contentinfo)).length
    `)

    if (moreThanOneContentinfoLandmark > 1) {
        auditResults.push(semanticErrors[8]);
    }
}