export function getUniqueSelector(element) {
  if (!(element instanceof Element)) return null;

  const parts = [];

  while (element && element.nodeType === Node.ELEMENT_NODE) {
    const tag = element.tagName.toLowerCase();

    if (element.id) {
      parts.unshift(`#${CSS.escape(element.id)}`);
      break;
    }

    const className = (element.className && typeof element.className === 'string')
      ? element.className.trim().split(/\s+/)[0]
      : null;

    let selector = tag;
    if (className) {
      selector += `.${CSS.escape(className)}`;
    }

    if (element.parentNode) {
      const siblings = Array.from(element.parentNode.children).filter(el => el.tagName === element.tagName);
      if (siblings.length > 1 && !className) {
        const index = Array.from(element.parentNode.children).indexOf(element) + 1;
        selector += `:nth-child(${index})`;
      }
    }

    parts.unshift(selector);
    element = element.parentElement;
  }

  return parts.join(' > ');
}