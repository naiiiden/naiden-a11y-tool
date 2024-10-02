function injectIframe() {
  const iframe = `
    <iframe id="naiden-a11y-tool" src="${chrome.runtime.getURL('index.html')}" style="position:fixed; bottom:0; right:0; width:300px; height:400px; z-index:1000;"></iframe>
  `;

  const naidenA11yIframe = document.getElementById('naiden-a11y-tool');

  if (!naidenA11yIframe) {
    document.body.insertAdjacentHTML('afterbegin', iframe);
  } else {
    naidenA11yIframe.remove();
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
  const elements = document.querySelectorAll('body *:not(div):not(span)');
  elements.forEach(element => {
    element.style.outline = '2px solid red'; 
  });
}

// Listening to messages from the iframe
window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TOGGLE_STYLES') {
    toggleStylesheets(event.data.disable);
  } else if (event.data && event.data.type === 'HIGHLIGHT_ELEMENTS') {
    highlightElements();
  }
});