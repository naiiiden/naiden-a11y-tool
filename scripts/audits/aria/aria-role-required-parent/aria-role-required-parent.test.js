import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaRoleRequiredParent } from "./aria-role-required-parent.js";

describe("has aria role required parent", () => {
  it("detects aria role with missing required parent", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="caption"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleRequiredParent();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria role with required parent', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="figure">
              <div role="caption"></div>
            </div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleRequiredParent();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div style="display: none;" role="caption"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleRequiredParent();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
