export function getUniqueSelector(element) {
  if (!(element instanceof Element)) return null;

  const parts = [];

  while (element && element.nodeType === Node.ELEMENT_NODE) {
    if (element.tagName.toLowerCase() === 'body') {
      break;
    }

    if (element.id) {
      parts.unshift(`#${CSS.escape(element.id)}`);
      break;
    }

    const tag = element.tagName.toLowerCase();
    const parent = element.parentElement;

    let selector = tag;

    if (element.classList.length > 0 && parent) {
      const classList = Array.from(element.classList);
      for (const cls of classList) {
        const sameTagSiblings = parent.querySelectorAll(`${tag}.${CSS.escape(cls)}`);
        if (sameTagSiblings.length === 1) {
          selector = `${tag}.${CSS.escape(cls)}`;
          break;
        }
      }
    }

    if (parent && selector === tag) {
      const siblings = Array.from(parent.children).filter(el => el.tagName === element.tagName);
      if (siblings.length > 1) {
        const index = siblings.indexOf(element) + 1;
        selector += `:nth-of-type(${index})`;
      }
    }

    parts.unshift(selector);
    element = parent;
  }

  return parts.join(' > ');
}