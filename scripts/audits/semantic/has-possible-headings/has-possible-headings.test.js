import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasPossibleHeadings } from "./has-possible-headings.js";

describe("has possible headings", () => {
  it("detects possible headings", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p style="font-size: 32px">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasPossibleHeadings();
    expect(results).toHaveLength(1);
  });

  it("ignores normal sized text", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p style="font-size: 16px">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasPossibleHeadings();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <p style="font-size: 32px; display: none;">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasPossibleHeadings();
    expect(results).toHaveLength(0);
  });
});
