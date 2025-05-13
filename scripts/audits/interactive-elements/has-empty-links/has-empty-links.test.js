import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasEmptyLinks } from "./has-empty-links.js";

describe("has empty links", () => {
  it("detects empty links", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <a href=""></a>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyLinks();
    expect(results).toHaveLength(1);
  });

  it('ignores non-empty links', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <a href="">link 1</a>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyLinks();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <a href="" style="display: none;"></a>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyLinks();
    expect(results).toHaveLength(0);
  });
});
