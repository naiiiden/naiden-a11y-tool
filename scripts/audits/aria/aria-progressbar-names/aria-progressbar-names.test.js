import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaProgressbarNames } from "./aria-progressbar-names.js";

describe("has aria progressbar names", () => {
  it("detects missing aria progressbar names", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="progressbar"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaProgressbarNames();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria progressbar with names', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="progressbar" aria-label="hey"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaProgressbarNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="progressbar" style="display: none;"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaProgressbarNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
