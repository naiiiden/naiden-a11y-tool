import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaToggleFieldNames } from "./aria-toggle-field-names.js";

describe("has aria toggle field names", () => {
  it("detects missing aria toggle field names", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="checkbox"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaToggleFieldNames();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria toggle field with names', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="checkbox" aria-label="hey"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaToggleFieldNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="checkbox" style="display: none;"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaToggleFieldNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
