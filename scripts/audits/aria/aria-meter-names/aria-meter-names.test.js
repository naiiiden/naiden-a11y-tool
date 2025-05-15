import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaMeterNames } from "./aria-meter-names.js";

describe("has aria meter names", () => {
  it("detects missing aria meter names", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="meter"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaMeterNames();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria meter with names', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="meter" aria-label="hey"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaMeterNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="meter" style="display: none;"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaMeterNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
