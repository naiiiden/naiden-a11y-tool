chrome.devtools.panels.create(
  "nano's a11y tool",
  "icon.png",
  "index.html",
  function(panel) {
    console.log("A11y auditing panel created.");
  }
);