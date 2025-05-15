import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaTreeitemNames } from "./aria-treeitem-names.js";

describe("has aria treeitem names", () => {
  it("detects missing aria treeitem names", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="treeitem"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaTreeitemNames();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria treeitem with names', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="treeitem" aria-label="hey"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaTreeitemNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="treeitem" style="display: none;"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaTreeitemNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
