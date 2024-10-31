chrome.devtools.panels.create(
  "naiden's a11y tool",
  "icon.png",
  "index.html",
  function(panel) {
    console.log("A11y auditing panel created.");
  }
);