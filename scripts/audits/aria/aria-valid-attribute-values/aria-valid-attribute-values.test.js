import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaValidAttributeValues } from "./aria-valid-attribute-values.js";

describe("has aria valid attributes values", () => {
  it("detects invalid aria attributes values", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="checkbox" aria-checked="5"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaValidAttributeValues();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores valid aria attributes values', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="checkbox" aria-checked="true"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaValidAttributeValues();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div style="display: none;" role="checkbox" aria-checked="5"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaValidAttributeValues();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
