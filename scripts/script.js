const toggleCheckbox = document.getElementById("toggle-stylesheets");

toggleCheckbox.addEventListener("change", () => {
  const disableStylesheets = toggleCheckbox.checked;

  window.parent.postMessage({ type: 'TOGGLE_STYLES', disable: disableStylesheets }, '*');
});

document.getElementById('highlight-btn').addEventListener('click', () => {
  window.parent.postMessage({ type: 'HIGHLIGHT_ELEMENTS' }, '*');
});

document.getElementById("nano-a11y-tool-close-btn").addEventListener("click", () => {
  window.parent.postMessage({ type: 'CLOSE_IFRAME' }, '*');
});