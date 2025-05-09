import { cssErrors } from "../../../errors/css.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasUnadjustableTextProperties() {
  const propertiesToCheck = [
    "line-height",
    "letter-spacing",
    "word-spacing",
    "font-size",
  ];
  const importantRegex = (property) =>
    new RegExp(`\\b${property}\\s*:\\s*[^;]+!important`, "i");

  function hasImportantProperty(element, property) {
    for (let i = 0; i < document.styleSheets.length; i++) {
      try {
        const rules = document.styleSheets[i].cssRules || document.styleSheets[i].rules;
        for (let j = 0; j < rules.length; j++) {
          if (rules[j].style && importantRegex(property).test(rules[j].cssText)) {
            const selector = rules[j].selectorText;
            if (selector && element.matches(selector)) {
              return true;
            }
          }
        }
      } catch (e) {
        continue;
      }
    }

    return false;
  }

  return Array.from(document.querySelectorAll("*"))
    .filter((link) => isElementVisible(link))
    .filter((element) => element.textContent.trim().length > 0)
    .filter((element) => {
      const style = element.getAttribute("style");
      return propertiesToCheck.some(
        (property) =>
          hasImportantProperty(element, property) ||
          (style && importantRegex(property).test(style)),
      );
    })
    .map((element) => {
      const style = element.getAttribute("style");
      const offendingStyles = propertiesToCheck.filter(
        (property) =>
          hasImportantProperty(element, property) ||
          (style && importantRegex(property).test(style)),
      );

      const inlineOffendingStyles = style
        ? propertiesToCheck.filter((property) => importantRegex(property).test(style))
        : [];

      return {
        outerHTML: element.outerHTML,
        selector: getUniqueSelector(element),
        offendingStyles: [...new Set([...offendingStyles, ...inlineOffendingStyles])],
      };
    });
}

export async function hasUnadjustableTextPropertiesEval(auditResults) {
  const unadjustableTextProperties = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasUnadjustableTextProperties = ${hasUnadjustableTextProperties.toString()};

        return hasUnadjustableTextProperties();
    `);

  unadjustableTextProperties.forEach((element) => {
    auditResults.push({
      ...cssErrors[2],
      element: element.outerHTML,
      selector: element.selector,
      offendingStyles: element.offendingStyles,
    });
  });
}
