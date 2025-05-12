import { inspectedWindowEval } from "./inspected-window-eval.js";

export function highlightElement(selector) {
  inspectedWindowEval(`
    const element = document.querySelector('${selector}');
    if (!element) return;
  
    const existingOverlay = document.querySelector('[data-selector="${selector}"]');
  
    if (element.hasAttribute('data-highlighted')) {
      element.removeAttribute("data-highlighted");
      element.style.outline = "none";
      if (existingOverlay) {
        existingOverlay.remove();
      }
    } else {
      element.setAttribute("data-highlighted", "");
      element.scrollIntoView({ behavior: "auto" });
      
      const rect = element.getBoundingClientRect();
      const overlay = document.createElement('div');
      overlay.setAttribute('data-selector', '${selector}');
      overlay.style.position = 'absolute';
      overlay.style.top = rect.top + window.scrollY + 'px';
      overlay.style.left = rect.left + window.scrollX + 'px';
      overlay.style.width = rect.width + 'px';
      overlay.style.height = rect.height + 'px';
      overlay.style.outline = '.25rem solid red';
      overlay.style.borderRadius = window.getComputedStyle(element).borderRadius;
      overlay.style.zIndex = '999999';
      overlay.style.pointerEvents = 'none';
      overlay.style.boxSizing = 'border-box';
      overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
      overlay.style.transition = 'opacity 0.2s ease';
  
      document.body.appendChild(overlay);
    }
  `);
}
