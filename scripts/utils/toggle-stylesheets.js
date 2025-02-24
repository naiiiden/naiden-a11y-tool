export function toggleStylesheets(disable) {
    const stylesheets = document.styleSheets;
    for (let i = 0; i < stylesheets.length; i++) {
      stylesheets[i].disabled = disable;
    }

    document.querySelectorAll('*').forEach((element) => {
      if (disable) {
        if (element.hasAttribute('style')) {
          element.setAttribute('disabled-style', element.getAttribute('style'));
          element.removeAttribute('style');
        }
      } else {
        if (element.hasAttribute('disabled-style')) {
          element.setAttribute('style', element.getAttribute('disabled-style'));
          element.removeAttribute('disabled-style');
        }
      }
    });
}