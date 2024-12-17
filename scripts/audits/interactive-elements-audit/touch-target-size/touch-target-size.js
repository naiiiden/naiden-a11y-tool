import { interactiveElementsErrors } from "../../../errors/interactive-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

export async function touchTargetSize(auditResults) {
    const touchTargetSize = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const MIN_TOUCH_SIZE = 24;
        const targets = Array.from(document.querySelectorAll('button, a, input, [role="button"], [role="link"]'));
        
        const results = [];

        targets.forEach((target, index) => {
            const rect = target.getBoundingClientRect();
            const { width, height, left, right, top, bottom } = rect;

            const sizeIsSufficient = width >= MIN_TOUCH_SIZE && height >= MIN_TOUCH_SIZE;

            let spacingIsSufficient = true;
            for (let i = 0; i < targets.length; i++) {
                if (i === index) continue; // Skip self-comparison
                const otherRect = targets[i].getBoundingClientRect();

                const horizontalOverlap = Math.max(0, Math.min(right, otherRect.right) - Math.max(left, otherRect.left));
                const verticalOverlap = Math.max(0, Math.min(bottom, otherRect.bottom) - Math.max(top, otherRect.top));
                const isOverlapping = horizontalOverlap > 0 && verticalOverlap > 0;

                if (isOverlapping || Math.hypot(left - otherRect.left, top - otherRect.top) < MIN_TOUCH_SIZE) {
                    spacingIsSufficient = false;
                    break;
                }
            }

            if (!sizeIsSufficient || !spacingIsSufficient) {
                results.push({
                    outerHTML: target.outerHTML,
                    selector: getUniqueSelector(target),
                    sizeIsSufficient,
                    spacingIsSufficient,
                });
            }
        });

        return results;
    `);

    touchTargetSize.forEach(error => {
        auditResults.push({
            ...interactiveElementsErrors[7],
            element: error.outerHTML,
            selector: error.selector,
            issues: {
                sizeIsSufficient: error.sizeIsSufficient,
                spacingIsSufficient: error.spacingIsSufficient,
            },
        });
    });
}