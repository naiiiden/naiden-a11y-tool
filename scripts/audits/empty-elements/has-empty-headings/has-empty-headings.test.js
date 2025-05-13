import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasEmptyHeadings } from "./has-empty-headings.js";

describe("has empty headings", () => {
  it("detects empty headings", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <h1></h1>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyHeadings();
    expect(results).toHaveLength(1);
  });

  it('ignores non-empty headings', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <h1>hey</h1>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyHeadings();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <h1 style="display: none;"></h1>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyHeadings();
    expect(results).toHaveLength(0);
  });
});
