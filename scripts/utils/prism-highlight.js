export function prismHighlightElement() {
    document.querySelectorAll('pre code').forEach((block) => {
        Prism.highlightElement(block);
    });
}