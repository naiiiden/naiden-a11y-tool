import { semanticErrors } from "../../../errors/semantic.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasHeadingLevelOne(auditResults) {
    const hasH1 = await inspectedWindowEval(`
        return !!document.querySelector('h1') || !!document.querySelector('[role="heading"][aria-level="1"]')
    `);

    if (!hasH1) {
        auditResults.push(semanticErrors[0]);
    }
}