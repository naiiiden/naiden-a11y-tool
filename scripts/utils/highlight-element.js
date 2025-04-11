export function highlightElement(selector) {
    chrome.devtools.inspectedWindow.eval(`
      (() => {
        const element = document.querySelector('${selector}');
        if (element) {
          if (element.classList.contains('error-element-highlighted')) {
            element.classList.remove('error-element-highlighted');
            element.style.outline = "none";
          } else {
            element.classList.add('error-element-highlighted');
            element.style.outline = '.25rem solid red';
            element.style.outlineOffset = ".25rem";
          }
        }
      })();
    `);
  }