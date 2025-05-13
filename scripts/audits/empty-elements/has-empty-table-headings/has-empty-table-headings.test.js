import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasEmptyTableHeading } from "./has-empty-table-headings.js";

describe("has empty table heading", () => {
  it("detects empty table heading", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <table>
              <th></th>
            </table>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyTableHeading();
    expect(results).toHaveLength(1);
  });

  it('ignores non-empty table heading', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <table>
              <th>hey</th>
            </table>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyTableHeading();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <table style="display: none">
              <th></th>
            </table>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyTableHeading();
    expect(results).toHaveLength(0);
  });
});
