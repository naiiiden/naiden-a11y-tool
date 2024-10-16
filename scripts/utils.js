export function getUniqueSelector(element) {
    if (element.id) {
      return `#${element.id}`;
    }
  
    let path = '';
    while (element.parentElement) {
      const index = Array.from(element.parentElement.children).indexOf(element) + 1;
      path = `${element.tagName}:nth-child(${index}) > ${path}`;
      element = element.parentElement;
    }
  
    return path.slice(0, -3); // Remove trailing ' > '
}