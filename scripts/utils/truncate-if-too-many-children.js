export function truncateIfTooManyChildren(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const rootElement = doc.body.firstElementChild;
  if (!rootElement) return html;

  const openingTag = rootElement.outerHTML.match(/^<[^>]+>/)?.[0] || "";
  const closingTag = rootElement.outerHTML.match(/<\/[^>]+>$/)?.[0] || "";

  let totalChildren = 0;

  const stack = Array.from(rootElement.children);

  while (stack.length > 0) {
    const element = stack.pop();
    totalChildren++;

    stack.push(...Array.from(element.children));

    if (totalChildren > 10) {
      return `${openingTag}${closingTag}`;
    }
  }

  return `${openingTag}${rootElement.innerHTML}${closingTag}`;
}
