export function getUniqueSelector(element) {
  const parts = [];

  while (element) {
    if (element.tagName.toLowerCase() === "body") {
      parts.unshift("body");
      break;
    }

    const tag = element.tagName.toLowerCase();
    const parent = element.parentElement;

    let selector = tag;

    if (element.id && !/^\d/.test(element.id) && element.id.trim() === element.id) {
      const escapedId = CSS.escape(element.id);
      const idSelector = `${tag}#${escapedId}`;
      const allMatches = document.querySelectorAll(`#${escapedId}`);

      if (allMatches.length === 1) {
        parts.unshift(`#${escapedId}`);
        break;
      } else {
        selector = idSelector;
      }
    }

    if (element.classList.length > 0 && parent) {
      const classList = Array.from(element.classList);
      for (const cls of classList) {
        const trimmedClass = cls.trim();
        if (!trimmedClass || /^\d/.test(trimmedClass)) continue;

        const escapedClass = CSS.escape(trimmedClass);
        const classSelector = `${tag}.${escapedClass}`;
        const sameTagSiblings = parent.querySelectorAll(classSelector);

        if (sameTagSiblings.length === 1) {
          selector = classSelector;
          break;
        } else {
          selector = classSelector;
        }
      }
    }

    if (parent) {
      const siblings = Array.from(parent.children).filter(
        (el) => el.tagName === element.tagName
      );
      if (siblings.length > 1) {
        const index = siblings.indexOf(element) + 1;
        selector += `:nth-of-type(${index})`;
      }
    }

    parts.unshift(selector);
    element = parent;
  }

  return parts.join(" > ");
}
