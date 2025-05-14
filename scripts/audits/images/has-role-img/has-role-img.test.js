import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasRoleImg } from "./has-role-img.js";

describe("has role img", () => {
  it("detects role img with missing alt", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <div role="img"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasRoleImg();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores role img with alt", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <div role="img" aria-label="hi"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasRoleImg();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div style="display: none;" role="img"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasRoleImg();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
