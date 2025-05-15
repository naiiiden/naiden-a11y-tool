import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaRoleAllowedAriaAttributes } from "./aria-role-allowed-aria-attributes.js";

describe("has aria role allowed aria attributes", () => {
  it("detects aria role with not allowed aria attributes", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="code" aria-label="hey"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleAllowedAriaAttributes();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria role with allowed aria attributes', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="checkbox" aria-checked="true"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleAllowedAriaAttributes();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div style="display: none;" role="code" aria-label="hey"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleAllowedAriaAttributes();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
