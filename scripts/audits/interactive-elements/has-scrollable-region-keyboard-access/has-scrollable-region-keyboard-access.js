import { interactiveElementsErrors } from "../../../errors/interactive-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasScrollableRegionKeyboardAccess() {
  const scrollableElements = Array.from(document.querySelectorAll("*"))
    .filter((el) => isElementVisible(el))
    .filter((el) => {
      const style = window.getComputedStyle(el);
      return (
        (style.overflow === "auto" ||
          style.overflow === "scroll" ||
          style.overflowY === "auto" ||
          style.overflowY === "scroll") &&
        el.scrollHeight > el.clientHeight
      );
    });

  return scrollableElements.map((el) => {
    const hasTabindex = el.hasAttribute("tabindex");
    const tabindexValue = el.getAttribute("tabindex");
    const isFocusable = hasTabindex && tabindexValue !== "-1";
    const containsFocusableElement = Array.from(el.querySelectorAll("*"))
      .filter((child) => isElementVisible(child))
      .some((child) => {
        const childTabindex = child.getAttribute("tabindex");
        return (
          child.nodeName === "A" ||
          child.nodeName === "BUTTON" ||
          child.nodeName === "INPUT" ||
          child.nodeName === "TEXTAREA" ||
          child.nodeName === "SELECT" ||
          (childTabindex !== null && childTabindex !== "-1")
        );
      });

    return {
      outerHTML: el.outerHTML,
      selector: getUniqueSelector(el),
      hasKeyboardAccess: isFocusable || containsFocusableElement,
    };
  });
}

export async function hasScrollableRegionKeyboardAccessEval(auditResults) {
  const scrollableRegionKeyboardAccess = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasScrollableRegionKeyboardAccess = ${hasScrollableRegionKeyboardAccess.toString()};

        return hasScrollableRegionKeyboardAccess();
    `);

  scrollableRegionKeyboardAccess.forEach((error) => {
    if (!error.hasKeyboardAccess) {
      auditResults.push({
        ...interactiveElementsErrors[5],
        element: error.outerHTML,
        selector: error.selector,
      });
    }
  });
}
