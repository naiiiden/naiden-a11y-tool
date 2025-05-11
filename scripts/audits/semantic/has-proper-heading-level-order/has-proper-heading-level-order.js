import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasProperHeadingLevelOrder() {
  return Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]'))
    .filter((heading) => isElementVisible(heading))
    .map((heading) => {
      let level;

      if (heading.hasAttribute("role") && heading.getAttribute("role") === "heading") {
        const ariaLevel = heading.getAttribute("aria-level");
        if (ariaLevel && !isNaN(ariaLevel)) {
          level = parseInt(ariaLevel, 10);
        } else {
          level = 2;
        }
      } else {
        level = parseInt(heading.tagName[1], 10);
      }

      return {
        level,
        tagName: heading.tagName,
        outerHTML: heading.outerHTML,
        selector: getUniqueSelector(heading),
      };
    });
}

export async function hasProperHeadingLevelOrdersEval(auditResults) {
  const headingLevels = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasProperHeadingLevelOrder = ${hasProperHeadingLevelOrder.toString()};

    return hasProperHeadingLevelOrder();
  `);

  if (headingLevels.length > 0) {
    if (headingLevels[0].level !== 1) {
      auditResults.push({
        ...semanticErrors[1],
        element: headingLevels[0].outerHTML,
        selector: headingLevels[0].selector,
      });
      return;
    }

    for (let i = 1; i < headingLevels.length; i++) {
      const prev = headingLevels[i - 1].level;
      const current = headingLevels[i].level;

      if (current > prev + 1) {
        auditResults.push({
          ...semanticErrors[1],
          element: headingLevels[i].outerHTML,
          selector: headingLevels[i].selector,
        });
        break;
      }
    }
  }
}
