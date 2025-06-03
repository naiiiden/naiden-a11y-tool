export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&c;(.*?)&ec;/gs, (_, content) => `%%CODE%%${content}%%ENDCODE%%`) // Temporarily mark code blocks
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/%%CODE%%(.*?)%%ENDCODE%%/gs, "<code>$1</code>"); // Restore <code> blocks
}
