export function inspectedWindowEval(script) {
  return new Promise((resolve) => {
    chrome.devtools.inspectedWindow.eval(`(() => { ${script} })()`, resolve);
  });
}
