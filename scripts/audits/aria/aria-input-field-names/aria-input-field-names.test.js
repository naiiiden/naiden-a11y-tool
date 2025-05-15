import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaInputFieldNames } from "./aria-input-field-names.js";

describe("has input field names", () => {
  it("detects missing aria input field names", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="combobox"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaInputFieldNames();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria input field with names', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="combobox" aria-label="hey"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaInputFieldNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="combobox" style="display: none;"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaInputFieldNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
