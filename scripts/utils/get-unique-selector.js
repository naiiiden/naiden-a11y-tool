export function getUniqueSelector(element) {
  const parts = [];

  const isValidCssIdentifier = (str) => {
    if (str.trim() !== str) return false;

    // CSS Identifiers: Must start with letter (a-z), underscore (_), or hyphen (-) followed by letter/underscore
    if (!/^([a-zA-Z_]|-[a-zA-Z_])/.test(str)) return false;
  
    // Allowed characters after start: letters, digits, hyphen, underscore
    // Anything else (space, ?, #, ., etc.) makes it invalid
    if (!/^[a-zA-Z0-9_-]+$/.test(str)) return false;

    return true;
  };

  while (element) {
    if (element.tagName.toLowerCase() === "body") {
      parts.unshift("body");
      break;
    }

    const tag = element.tagName.toLowerCase();
    const parent = element.parentElement;

    let selector = tag;

    if (element.id && isValidCssIdentifier(element.id)) {
      const idSelector = `${tag}#${element.id}`;
      const allMatches = document.querySelectorAll(`#${element.id}`);

      if (allMatches.length === 1) {
        parts.unshift(`#${element.id}`);
        break;
      } else {
        selector = idSelector;
      }
    }

    if (element.classList.length > 0 && parent) {
      const classList = Array.from(element.classList);
      for (const cls of classList) {
        if (!isValidCssIdentifier(cls)) continue;

        const classSelector = `${tag}.${cls}`;
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
