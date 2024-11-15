import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasHeadingLevelOne(auditResults) {
    const hasH1 = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(
        `!!document.querySelector('h1') || !!document.querySelector('[role="heading"][aria-level="1"]')`,
        resolve
        );
    });

    if (!hasH1) {
        auditResults.push(semanticErrors[0]);
    }
}