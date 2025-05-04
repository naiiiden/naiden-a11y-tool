export function getUniqueSelector(element) {
  if (!(element instanceof Element)) return null;

  const parts = [];

  while (element && element.nodeType === Node.ELEMENT_NODE) {
    if (element.tagName.toLowerCase() === 'body') {
      break;
    }

    const tag = element.tagName.toLowerCase();
    const parent = element.parentElement;

    let selector = tag;

    if (element.id) {
      const id = CSS.escape(element.id);
      const idSelector = `${tag}#${id}`;
      const allMatches = document.querySelectorAll(`#${id}`);
      if (allMatches.length === 1) {
        parts.unshift(`#${id}`);
        break;
      } else {
        selector = idSelector;
      }
    }

    if (!selector || selector === tag) {
      if (element.classList.length > 0 && parent) {
        const classList = Array.from(element.classList);
        for (const cls of classList) {
          const classSelector = `${tag}.${CSS.escape(cls)}`;
          const sameTagSiblings = parent.querySelectorAll(classSelector);
          if (sameTagSiblings.length === 1) {
            selector = classSelector;
            break;
          } else {
            selector = classSelector;
          }
        }
      }
    }

    if (parent) {
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