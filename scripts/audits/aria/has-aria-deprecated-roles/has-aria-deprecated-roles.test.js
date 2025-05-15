import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaDeprecatedRoles } from "./has-aria-deprecated-roles.js";

describe("has aria deprecated roles", () => {
  it("detects deprecated aria roles", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="directory"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaDeprecatedRoles();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores non-deprecated roles', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="treeitem" aria-label="hey"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaDeprecatedRoles();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="directory" style="display: none;"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaDeprecatedRoles();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
