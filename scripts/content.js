function injectIframe() {
  // if (window.top !== window.self) {
  //   return; // Exit if running inside an iframe
  // }

  const naidenA11yIframe = `
    <iframe id="naiden-a11y-tool" src="${chrome.runtime.getURL('index.html')}"></iframe>
  `;

  const naidenIframe = document.getElementById('naiden-a11y-tool');

  if (!naidenIframe) {
    document.body.insertAdjacentHTML('afterbegin', naidenA11yIframe);
  } else {
    naidenIframe.remove();
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

window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TOGGLE_STYLES') {
    toggleStylesheets(event.data.disable);
  }
});