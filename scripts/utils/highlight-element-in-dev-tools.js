import { inspectedWindowEval } from "./inspected-window-eval.js";

export function highlightElementInDevTools(selector) {
  inspectedWindowEval(`
    const element = document.querySelector('${selector}');
    if (element) {
      inspect(element);
    }  
  `);
}
