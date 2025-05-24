const devtools = typeof browser !== "undefined" ? browser.devtools : chrome.devtools;

export function inspectedWindowEval(script) {
  return new Promise((resolve) => {
    devtools.inspectedWindow.eval(`(() => { ${script} })()`, resolve);
  });
}
