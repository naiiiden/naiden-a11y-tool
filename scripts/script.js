document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('toggle-stylesheets').addEventListener('change', () => {
    const disable = document.getElementById('toggle-stylesheets').checked;

    chrome.devtools.inspectedWindow.eval(
      `(${toggleStylesheets.toString()})(${disable});`
    );
  });

  document.getElementById('highlight-btn').addEventListener('click', () => {
    chrome.devtools.inspectedWindow.eval(
      `(${highlightElements.toString()})();`
    );
  });

  // Call the function to get the element count
  getElementCount();
});

// Function to count the elements in the inspected window
function getElementCount() {
  chrome.devtools.inspectedWindow.eval(
    `document.body.getElementsByTagName('*').length`,
    (result, isException) => {
      if (isException) {
        console.error("Error counting elements:", isException);
        return;
      }
      // Update the count in the DevTools panel
      document.getElementById('element-count').textContent = result;
    }
  );
}

// Existing functions
function toggleStylesheets(disable) {
  const stylesheets = document.styleSheets;
  for (let i = 0; i < stylesheets.length; i++) {
    stylesheets[i].disabled = disable;
  }
}

function highlightElements() {
  const elements = document.querySelectorAll('body *:not(div):not(span)');
  elements.forEach(element => {
    if (element.style.outline == "") {
      element.style.outline = '2px solid red'; 
    } else {
      element.style.outline = "";
    }
  });
}