import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasHtmlLangAttr } from "./has-html-lang-attr.js";

describe("hasHtmlLangAttr audit", () => {
  it("pushes an error if <html> has no lang attribute", () => {
    setupDOM(`
      <html>
        <head>
          <title>hasHtmlLangAttr</title>
        </head>
        <body>
        </body>
      </html>  
    `);

    const results = hasHtmlLangAttr();
    expect(results.hasLangAttr).toBe(null);
  });

  it("does not push an error if <html> has lang attribute", () => {
    setupDOM(`
      <html lang="en">
        <head>
          <title>hasHtmlLangAttr</title>
        </head>
        <body>
        </body>
      </html>  
    `);

    const results = hasHtmlLangAttr();
    expect(results.hasLangAttr).not.toBe(null || "");
  });
});
