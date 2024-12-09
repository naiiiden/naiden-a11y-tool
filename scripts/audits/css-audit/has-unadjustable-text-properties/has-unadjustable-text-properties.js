import { cssErrors } from "../../../errors/css.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function hasUnadjustableTextProperties(auditResults) {
    const hasUnadjustableTextProperties = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const propertiesToCheck = ['line-height', 'letter-spacing', 'word-spacing', 'font-size'];

        return Array.from(document.querySelectorAll('*[style]'))
            .filter(element => {
                const style = element.getAttribute('style');
                return propertiesToCheck.some(property => 
                    new RegExp(\`\\\\b\${property}\\\\s*:\\\\s*[^;]+!important\`).test(style)
                );
            })
            .map(element => ({
                outerHTML: element.outerHTML,
                selector: getUniqueSelector(element),
                inlineStyle: element.getAttribute('style')
            }));
    `);

    hasUnadjustableTextProperties.forEach(element => {
        auditResults.push({
            ...cssErrors[2],
            element: element.outerHTML,
            selector: element.selector,
        });
    });
}