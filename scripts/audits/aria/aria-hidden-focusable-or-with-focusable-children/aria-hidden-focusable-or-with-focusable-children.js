import { ariaErrors } from "../../../errors/aria.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasAriaHiddenFocusableOrWithFocusableChildren() {
  // :is(
  //     :is([role='button'], [role='link'])[tabindex]:not([tabindex^='-'], [tabindex='']), 
  //     a[href], 
  //     :is(input:not([type='hidden']), textarea, select, button):not(:disabled), 
  //     [tabindex]:not([tabindex^='-'], [tabindex='']), 
  //     [contenteditable]:not([contenteditable='false']), 
  //     summary:not([tabindex^="-"], [tabindex='']), 
  //     :is(audio, video)[controls],
  //     embed,
  //     area[href]:is(map[name]:not([name='']) area)
  // ):not([tabindex='-1'])
  const focusableElementSelector = `
    [role="button"][tabindex]:not([tabindex^="-"], [tabindex=""]), 
    [role="link"][tabindex]:not([tabindex^="-"], [tabindex=""]), 
    a[href]:not([tabindex^="-"]),
    input:not([type='hidden']):not(:disabled):not([tabindex^="-"]), 
    textarea:not(:disabled):not([tabindex^="-"]), 
    select:not(:disabled):not([tabindex^="-"]), 
    button:not(:disabled):not([tabindex^="-"]), 
    [tabindex]:not([tabindex^='-'], [tabindex='']), 
    [contenteditable]:not([contenteditable='false']):not([tabindex^='-'], [tabindex='']), 
    summary:not([tabindex^="-"], [tabindex='']):not([tabindex^='-'], [tabindex='']), 
    :is(audio, video)[controls]:not([tabindex^='-'], [tabindex='']), 
    embed:not([tabindex^='-'], [tabindex='']), 
    area[href]:is(map area):not([tabindex^='-'])
  `;

  const elements = Array.from(
    document.querySelectorAll("[aria-hidden='true']:not([tabindex='-1'])")
  );

  const withFocusableChildren = [];
  const focusableHidden = [];

  elements.forEach((element) => {
    const visibleFocusableChildren = Array.from(
      element.querySelectorAll(focusableElementSelector)
    ).filter((child) => isElementVisible(child));

    if (visibleFocusableChildren.length > 0) {
      withFocusableChildren.push({
        outerHTML: element.outerHTML,
        selector: getUniqueSelector(element),
        focusableChildren: visibleFocusableChildren.map((child) => ({
          outerHTML: child.outerHTML,
          selector: getUniqueSelector(child),
        })),
      });
      return;
    }

    if (isElementVisible(element) && element.matches(focusableElementSelector)) {
      focusableHidden.push({
        outerHTML: element.outerHTML,
        selector: getUniqueSelector(element),
      });
    }
  });

  return { withFocusableChildren, focusableHidden };
}

export async function hasAriaHiddenFocusableOrWithFocusableChildrenEval(auditResults) {
  const ariaHiddenResults = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasAriaHiddenFocusableOrWithFocusableChildren = ${hasAriaHiddenFocusableOrWithFocusableChildren.toString()};

    return hasAriaHiddenFocusableOrWithFocusableChildren();
  `);

  ariaHiddenResults.withFocusableChildren.forEach((element) => {
    auditResults.push({
      ...ariaErrors[8],
      element: element.outerHTML,
      selector: element.selector,
      helperText: `The element with \`aria-hidden="true"\` contains the following focusable or interactive children, which should not be focusable:
                ${element.focusableChildren
                  .map((child) => `\n- Focusable element: ${child.outerHTML}`)
                  .join("")}`,
    });
  });

  ariaHiddenResults.focusableHidden.forEach((element) => {
    auditResults.push({
      ...ariaErrors[8],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
