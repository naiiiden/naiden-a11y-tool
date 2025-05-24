const ext = typeof browser !== "undefined" ? browser : chrome;

(ext.devtools.panels.create)(
  "naiden's a11y audit tool",
  "icon.png",
  "devtools.html",
);
