function injectIframe() {
  const naidenA11yIframe = `
    <iframe id="naiden-a11y-tool" src="${chrome.runtime.getURL('index.html')}" style="
      position: fixed;
      top: 0;
      left: 0;
      width: 50%;
      height: 50%;
      z-index: 9999;
    "></iframe>
  `;

  const naidenIframe = document.getElementById('naiden-a11y-tool');

  if (!naidenIframe) {
    document.body.insertAdjacentHTML('afterbegin', naidenA11yIframe);
  } else {
    naidenIframe.remove();
  }
}

injectIframe();