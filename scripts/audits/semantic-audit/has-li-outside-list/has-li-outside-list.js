import { semanticErrors } from "../../../errors/semantic.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasLiOutsideList() {
  return Array.from(document.querySelectorAll("li:not(ul li, ol li)"))
    .filter((li) => isElementVisible(li))
    .map((li) => ({
      outerHTML: li.outerHTML,
      selector: getUniqueSelector(li),
    }));
}

export async function hasLiOutsideListEval(auditResults) {
  const liOutsideList = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const isElementVisible = ${isElementVisible.toString()};
    const hasLiOutsideList = ${hasLiOutsideList.toString()};

    return hasLiOutsideList();
  `);

  liOutsideList.forEach((element) => {
    auditResults.push({
      ...semanticErrors[15],
      element: element.outerHTML,
      selector: element.selector,
    });
  });
}
