import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasBypass(auditResults) {
    const hasBypass = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};

        const skipLinks = Array.from(document.querySelectorAll('a[href^="#"]')).filter(link => {
            const target = document.querySelector(link.getAttribute('href'));
            return target && target.tagName === 'MAIN';
        });
        const mainElements = Array.from(document.querySelectorAll("main, [role='main']"));
        const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));

        return {
            skipLinks,
            mainElements,
            headings
        }
    `)

    if (hasBypass.skipLinks.length === 0 && hasBypass.mainElements.length === 0 && hasBypass.headings.length === 0) {
        auditResults.push(semanticErrors[18]);
    }
}