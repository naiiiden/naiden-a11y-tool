function injectIframe() {
  const iframe = `
    <iframe id="naiden-a11y-tool" src="${chrome.runtime.getURL('index.html')}"></iframe>
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

window.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TOGGLE_STYLES') {
    toggleStylesheets(event.data.disable);
  }
});