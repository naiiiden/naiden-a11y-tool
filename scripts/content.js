function injectIframe() {
  const iframeElement = document.createElement('iframe');
  iframeElement.src = chrome.runtime.getURL('index.html');
  iframeElement.style.position = 'fixed';
  iframeElement.style.top = '0';
  iframeElement.style.left = '0';
  iframeElement.style.width = '50%';
  iframeElement.style.height = '50%';
  iframeElement.style.zIndex = '9999';

  document.body.insertBefore(iframeElement, document.body.firstChild);
}

injectIframe();