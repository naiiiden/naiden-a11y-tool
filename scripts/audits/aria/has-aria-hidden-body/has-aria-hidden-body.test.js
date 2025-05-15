import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaHiddenBody } from "./has-aria-hidden-body.js";

describe("has aria-hidden body", () => {
  it("detects aria-hidden body", () => {
    setupDOM(`
      <html>
        <body aria-hidden="true">
          <main id="main">
            <div role="directory"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaHiddenBody();
    console.log(results);
    expect(results.isHidden).toBe(true);
  });

  it('ignores non aria-hidden body', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="treeitem" aria-label="hey"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaHiddenBody();
    console.log(results);
    expect(results.isHidden).toBe(false);
  });
});
