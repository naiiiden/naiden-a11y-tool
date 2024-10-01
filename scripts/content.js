chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.toggleStylesheets !== undefined) {
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  
      stylesheets.forEach((stylesheet) => {
        stylesheet.disabled = message.toggleStylesheets;
      });
    }
});

// Listen for messages and handle DOM interactions
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'highlightElements') {
    const elements = document.querySelectorAll('*:not(div):not(span)');

    elements.forEach((element) => {
      element.style.outline = '2px solid red'; // Highlight the elements
    });

    sendResponse({ elementCount: elements.length });
  }
});