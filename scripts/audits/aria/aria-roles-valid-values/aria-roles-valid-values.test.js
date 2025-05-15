import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaRoleValidValues } from "./aria-roles-valid-values.js";

describe("has aria valid role values", () => {
  it("detects invalid aria role values", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="chekcbox"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleValidValues();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores valid aria role values', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="checkbox"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleValidValues();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div style="display: none;" role="chekcbox"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleValidValues();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
