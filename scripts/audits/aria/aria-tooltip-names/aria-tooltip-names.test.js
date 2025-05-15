import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaTooltipNames } from "./aria-tooltip-names.js";

describe("has aria tooltip names", () => {
  it("detects missing aria tooltip names", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="tooltip"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaTooltipNames();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria tooltip with names', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="tooltip" aria-label="hey"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaTooltipNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="tooltip" style="display: none;"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaTooltipNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
