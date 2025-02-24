export function highlightElement(selector) {
    chrome.devtools.inspectedWindow.eval(`
      (() => {
        const element = document.querySelector('${selector}');
        if (element) {
          if (element.classList.contains('highlighted')) {
            element.classList.remove('highlighted');
            element.style.outline = '';
          } else {
            element.classList.add('highlighted');
            element.style.outline = '3px solid red';
          }
        }
      })();
    `);
  }