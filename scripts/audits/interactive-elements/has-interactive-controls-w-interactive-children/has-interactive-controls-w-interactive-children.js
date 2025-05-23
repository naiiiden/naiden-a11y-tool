import { interactiveElementsErrors } from "../../../errors/interactive-elements.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasInteractiveControlsWithInteractiveControlsAsChildren() {
  const parents = `
    button:not(:disabled), 
    a[href], 
    :is([role='button'], [role='link'])[tabindex]:not([tabindex^='-'], [tabindex='']), 
    [contenteditable]:not([contenteditable='false']), 
    [tabindex]:not([tabindex^="-"], [tabindex=''])
  `;

  // const children = `
  //   :is(
  //     a[href], 
  //     :is([role='button'], [role='link'])[tabindex]:not([tabindex^='-'], [tabindex='']), 
  //     [contenteditable]:not([contenteditable='false']), 
  //     [tabindex]:not([tabindex^="-"], [tabindex='']), 
  //     :is(input:not([type='hidden']), textarea, select, button):not(:disabled), 
  //     summary:not([tabindex^="-"], [tabindex='']), 
  //     :is(audio, video)[controls],
  //     embed,
  //     area[href]:is(map[name]:not([name='']) area
  //   )):not([tabindex='-1'])
  // `;
  const children = `
    a[href]:not([tabindex="-1"]), 
    [role="button"][tabindex]:not([tabindex^='-'], [tabindex='']), 
    [role="link"][tabindex]:not([tabindex^='-'], [tabindex='']), 
    [contenteditable]:not([contenteditable='false']):not([tabindex='-1']), 
    [tabindex]:not([tabindex^="-"], [tabindex='']), 
    :is(input, textarea, select, button):not([type='hidden']):not(:disabled):not([tabindex='-1'])
    summary:not([tabindex^="-"], [tabindex='']), 
    :is(audio, video)[controls]:not([tabindex='-1']),
    embed:not([tabindex='-1']), 
    area[href]:is(map area):not([tabindex='-1'])
  `;

  return Array.from(document.querySelectorAll(parents))
    .filter((parent) => {
      if (!isElementVisible(parent)) {
        return false;
      }

      return Array.from(parent.querySelectorAll(children)).some((child) =>
        isElementVisible(child),
      );
    })
    .map((parent) => {
      return {
        outerHTML: parent.outerHTML,
        selector: getUniqueSelector(parent),
      };
    });
}

export async function hasInteractiveControlsWithInteractiveControlsAsChildrenEval(
  auditResults,
) {
  const interactiveControlsWithInteractiveControlsAsChildren = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasInteractiveControlsWithInteractiveControlsAsChildren = ${hasInteractiveControlsWithInteractiveControlsAsChildren.toString()};

    return hasInteractiveControlsWithInteractiveControlsAsChildren();
  `);

  interactiveControlsWithInteractiveControlsAsChildren.forEach((element) => {
    auditResults.push({
      ...interactiveElementsErrors[3],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
