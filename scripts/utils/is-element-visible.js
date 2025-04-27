export function isElementVisible(element) {
    if (!element) {
        return false;
    }

    const style = window.getComputedStyle(element);

    if (style.display === 'none' || 
        style.visibility === 'hidden' || 
        style.visibility === 'collapse') {
        return false;
    }

    const parent = element.parentElement;
    if (parent) {
        return isElementVisible(parent);
    }

    return true;
}