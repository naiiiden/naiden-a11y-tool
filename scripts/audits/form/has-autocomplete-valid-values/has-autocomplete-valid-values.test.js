import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAutocompleteValidValues } from "./has-autocomplete-valid-values.js";

describe("has autocomplete valid values", () => {
  it("detects autocomplete with invalid value", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <input type="text" autocomplete="xxx"/>
          </main>
        </body>
      </html>
    `);

    const results = hasAutocompleteValidValues();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores autocomplete with valid value", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <input type="text" autocomplete="name"/>
          </main>
        </body>
      </html>
    `);

    const results = hasAutocompleteValidValues();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <input style="display: none;" type="text" autocomplete="xxx"/>
          </main>
        </body>
      </html>
    `);

    const results = hasAutocompleteValidValues();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
