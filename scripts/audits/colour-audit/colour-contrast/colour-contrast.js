import { colourErrors } from "../../../errors/colour.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function colourContrast(auditResults) {
    const colourContrast = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        console.log(1);
    `)
}