function injectIframe() {
  const iframe = `<iframe id="naiden-a11y-tool" src="${chrome.runtime.getURL('index.html')}"></iframe>`;

  let naidenA11yIframe = document.getElementById('naiden-a11y-tool');
  const windowHTML = document.documentElement; 
  
  if (!naidenA11yIframe) {
    document.body.insertAdjacentHTML('afterbegin', iframe);
    naidenA11yIframe = document.getElementById('naiden-a11y-tool');

    naidenA11yIframe.addEventListener("load", () => {
      const naidenA11yIframeWidth = document.getElementById("naiden-a11y-tool").offsetWidth;
      windowHTML.style.marginLeft = `${naidenA11yIframeWidth}px`;
    });
  } else {
    naidenA11yIframe.remove();
    windowHTML.style.marginLeft = "unset";
    toggleStylesheets(false);
  }
}
injectIframe();

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
    injectIframe();
  }
});