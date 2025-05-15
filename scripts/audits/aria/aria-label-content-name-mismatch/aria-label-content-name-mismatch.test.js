import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaLabelContentNameMismatch } from "./aria-label-content-name-mismatch.js";

describe("has aria label content name mismatch", () => {
  it("detects aria label content name mismatch", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="button" aria-label="hey">hello</div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaLabelContentNameMismatch();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria label content name match', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="button" aria-label="hello there">hello</div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaLabelContentNameMismatch();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div style="display: none;" role="button" aria-label="hey"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaLabelContentNameMismatch();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
