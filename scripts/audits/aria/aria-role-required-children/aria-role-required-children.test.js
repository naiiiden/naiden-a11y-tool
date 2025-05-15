import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaRoleRequiredChildren } from "./aria-role-required-children.js";

describe("has aria role required children", () => {
  it("detects aria role with missing required children", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="feed"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleRequiredChildren();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria role with required children', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="feed">
              <div role="article"></div>
            </div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleRequiredChildren();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div style="display: none;" role="feed"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleRequiredChildren();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
