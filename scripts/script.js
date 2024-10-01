const toggleCheckbox = document.getElementById("toggle-stylesheets");

toggleCheckbox.addEventListener("change", () => {
  const disableStylesheets = toggleCheckbox.checked;

  // Get the active tab and send a message to content.js
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { toggleStylesheets: disableStylesheets });
  });
});

// This part remains clean, just sending a message to the content script
document.getElementById('highlight-btn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'highlightElements' }, (response) => {
      console.log('Highlighted elements:', response.elementCount);
    });
  });
});