function injectIframe() {
  const iframe = `<iframe id="nano-a11y-tool" src="${chrome.runtime.getURL('index.html')}"></iframe>`;

  let nanoA11yIframe = document.getElementById('nano-a11y-tool');
  const windowHTML = document.documentElement; 
  
  if (!nanoA11yIframe) {
    document.body.insertAdjacentHTML('afterbegin', iframe);
    nanoA11yIframe = document.getElementById('nano-a11y-tool');

    nanoA11yIframe.addEventListener("load", () => {
      const nanoA11yIframeWidth = document.getElementById("nano-a11y-tool").offsetWidth;
      windowHTML.style.marginLeft = `${nanoA11yIframeWidth}px`;
    });
  } else {
    nanoA11yIframe.remove();
    windowHTML.style.marginLeft = "unset";
    toggleStylesheets(false);
  }
}
injectIframe();

function removeIframe() {
  const nanoA11yIframe = document.getElementById('nano-a11y-tool');
  const windowHTML = document.documentElement;
  
  if (nanoA11yIframe) {
    nanoA11yIframe.remove();
    windowHTML.style.marginLeft = "unset";
    toggleStylesheets(false);
  }
}

function toggleStylesheets(disable) {
  const stylesheets = document.styleSheets;

  for (let i = 0; i < stylesheets.length; i++) {
    stylesheets[i].disabled = disable;
  }
}

function highlightElements() {
  // wip
  const elements = document.querySelectorAll('body *:not(div):not(span)');
  elements.forEach(element => {
    if (element.style.outline == "") {
      element.style.outline = '2px solid red'; 
    } else {
      element.style.outline = "";
    }
  });
}

// Listening to messages from the iframe
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TOGGLE_STYLES') {
    toggleStylesheets(event.data.disable);
  } else if (event.data && event.data.type === 'HIGHLIGHT_ELEMENTS') {
    highlightElements();
  } if (event.data && event.data.type === "CLOSE_IFRAME") {
    removeIframe();
  }
});