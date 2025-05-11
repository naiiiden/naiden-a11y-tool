import { interactiveElementsErrors } from "../../../errors/interactive-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasSufficientTouchTargetSize() {
  const MIN_TOUCH_SIZE = 24;

  const targets = Array.from(
    document.querySelectorAll(`
        a[href],  
        :is([role="button"], [role="link"], [role="checkbox"], [role="radio"], [role="tab"], [role="menuitem"])[tabindex]:not([tabindex^='-'], [tabindex='']), 
        :is(input:not([type='hidden']), textarea, select, button):not(:disabled)
    `),
  ).filter((el) => isElementVisible(el));

  const results = [];

  function hasSufficientSize(rect) {
    return rect.width >= MIN_TOUCH_SIZE && rect.height >= MIN_TOUCH_SIZE;
  }

  function circleIntersectsRect(circleX, circleY, radius, rect) {
    const closestX = Math.max(rect.left, Math.min(circleX, rect.right));
    const closestY = Math.max(rect.top, Math.min(circleY, rect.bottom));

    const dx = circleX - closestX;
    const dy = circleY - closestY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < radius;
  }

  function circlesIntersect(x1, y1, x2, y2, radius) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < radius * 2;
  }

  const undersizedTargets = [];

  for (let i = 0; i < targets.length; i++) {
    const target = targets[i];
    const rect = target.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) continue;

    if (!hasSufficientSize(rect)) {
      undersizedTargets.push({
        index: i,
        rect,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2,
      });
    }
  }

  for (let i = 0; i < undersizedTargets.length; i++) {
    const current = undersizedTargets[i];
    const radius = MIN_TOUCH_SIZE / 2;
    let spacingIsSufficient = true;

    for (let j = 0; j < targets.length; j++) {
      if (j === current.index) continue;

      const otherRect = targets[j].getBoundingClientRect();

      if (otherRect.width === 0 || otherRect.height === 0) continue;

      if (circleIntersectsRect(current.centerX, current.centerY, radius, otherRect)) {
        spacingIsSufficient = false;
        break;
      }
    }

    if (spacingIsSufficient) {
      for (let j = 0; j < undersizedTargets.length; j++) {
        if (i === j) continue;

        const other = undersizedTargets[j];

        if (
          circlesIntersect(
            current.centerX,
            current.centerY,
            other.centerX,
            other.centerY,
            radius,
          )
        ) {
          spacingIsSufficient = false;
          break;
        }
      }
    }

    if (!spacingIsSufficient) {
      const target = targets[current.index];
      results.push({
        outerHTML: target.outerHTML,
        selector: getUniqueSelector(target),
        sizeIsSufficient: false,
        spacingIsSufficient: false,
        width: Math.round(current.rect.width),
        height: Math.round(current.rect.height),
      });
    }
  }

  return results;
}

export async function hasSufficientTouchTargetSizeEval(auditResults) {
  const sufficientTouchTargetSize = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasTouchTargetSize = ${hasTouchTargetSize.toString()};

    return hasTouchTargetSize();    
  `);

  sufficientTouchTargetSize.forEach((error) => {
    auditResults.push({
      ...interactiveElementsErrors[7],
      element: error.outerHTML,
      selector: error.selector,
      issues: {
        sizeIsSufficient: error.sizeIsSufficient,
        spacingIsSufficient: error.spacingIsSufficient,
        dimensions: `${error.width}×${error.height} pixels`,
      },
    });
  });
}
