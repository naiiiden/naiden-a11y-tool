export function getUniqueSelector(element) {
  const path = [];

  while (
    element &&
    element.nodeType === Node.ELEMENT_NODE &&
    element.tagName.toLowerCase() !== 'html' &&
    element.tagName.toLowerCase() !== 'body'
  ) {
    const tag = element.tagName.toLowerCase();

    const siblings = Array.from(element.parentElement.children).filter(
      el => el.tagName === element.tagName
    );

    if (siblings.length === 1) {
      path.unshift(tag);
    } else {
      const index = Array.from(element.parentElement.children).indexOf(element) + 1;
      path.unshift(`${tag}:nth-child(${index})`);
    }

    element = element.parentElement;
  }

  return path.join(' > ');
}