chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.toggleStylesheets !== undefined) {
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  
      stylesheets.forEach((stylesheet) => {
        stylesheet.disabled = message.toggleStylesheets;
      });
    }
});