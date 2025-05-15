import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaValidAttributes } from "./aria-valid-attributes.js";

describe("has aria valid attributes", () => {
  it("detects invalid aria attributes", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="checkbox" aria-chekced="true"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaValidAttributes();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores valid aria attributes', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="checkbox" aria-checked="true"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaValidAttributes();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div style="display: none;" role="checkbox" aria-chekced="true"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaValidAttributes();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
