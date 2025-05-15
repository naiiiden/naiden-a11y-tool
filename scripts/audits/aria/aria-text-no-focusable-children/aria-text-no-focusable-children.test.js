import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaTextNoFocusableChildren } from "./aria-text-no-focusable-children.js";

describe("has aria text no focusable children", () => {
  it("detects aria text with focusable children", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="text">
              <button>hi</button>
            </div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaTextNoFocusableChildren();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria text with no focusable children', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="text">hello</div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaTextNoFocusableChildren();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div style="display: none;" role="text">
              <button>hello</button>
            </div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaTextNoFocusableChildren();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
