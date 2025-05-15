import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaRoleRequiredAriaAttributes } from "./aria-role-required-aria-attributes.js";

describe("has aria role required aria attributes", () => {
  it("detects aria role with missing required aria attributes", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="checkbox"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleRequiredAriaAttributes();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria role with required required aria attributes', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="checkbox" aria-checked="true"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleRequiredAriaAttributes();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div style="display: none;" role="checkbox"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaRoleRequiredAriaAttributes();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
