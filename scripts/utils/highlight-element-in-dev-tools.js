export function highlightElementInDevTools(selector) {
    chrome.devtools.inspectedWindow.eval(`
      (() => {
        const element = document.querySelector('${selector}');
        if (element) {
          inspect(element);
        }
      })();
    `);
}