import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasHeadings } from "./has-headings.js";

describe("has headings", () => {
  it("detects missing headings", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p>hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasHeadings();
    console.log(results);
    expect(results).toBe(false);
  });

  it('ignores headings', () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <h1>hey</h1>
          </main>
        </body>
      </html>
    `);

    const results = hasHeadings();
    console.log(results);
    expect(results).toBe(true);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <h1 style="display: none;">hey</h1>
          </main>
        </body>
      </html>
    `);

    const results = hasHeadings();
    console.log(results);
    expect(results).toBe(false);
  });
});
