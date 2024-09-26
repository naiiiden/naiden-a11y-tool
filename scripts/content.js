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
  }
}

injectIframe();