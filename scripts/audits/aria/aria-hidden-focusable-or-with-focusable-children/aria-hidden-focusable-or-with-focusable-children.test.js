import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaHiddenFocusableOrWithFocusableChildren } from "./aria-hidden-focusable-or-with-focusable-children.js";

describe("has aria hidden focusable or with focusable children", () => {
  it("detects aria hidden focusable or with focusable children", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button aria-hidden="true">
              hi
            </button>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaHiddenFocusableOrWithFocusableChildren();
    console.log(results);
    expect(results.focusableHidden).toHaveLength(1);
  });

  it('ignores aria hidden not focusable or without focusable children', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button aria-hidden="true" tabindex="-1">
              hi
            </button>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaHiddenFocusableOrWithFocusableChildren();
    console.log(results);
    expect(results.focusableHidden).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <<button aria-hidden="true" style="display: none;">
              hi
            </button>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaHiddenFocusableOrWithFocusableChildren();
    console.log(results);
    expect(results.focusableHidden).toHaveLength(0);
  });
});
