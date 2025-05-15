import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaRoleProhibitedAttributes } from "./aria-role-prohibited-attributes.js";

describe("has aria role prohibited aria attributes", () => {
  it("detects aria role with prohibited aria attributes", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="code" aria-label="hey"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleProhibitedAttributes();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria role with no prohibited aria attributes', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="code"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleProhibitedAttributes();
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

    const results = hasAriaRoleProhibitedAttributes();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
