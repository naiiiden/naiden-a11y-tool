import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasHeadingLevelOne } from "./has-heading-level-one.js";

describe("has heading level one", () => {
  it("detects missing heading level one", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p>hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasHeadingLevelOne();
    console.log(results);
    expect(results).toBe(null);
  });

  it('ignores heading level one', () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <h1>hey</h1>
          </main>
        </body>
      </html>
    `);

    const results = hasHeadingLevelOne();
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

    const results = hasHeadingLevelOne();
    console.log(results);
    expect(results).toBe(null);
  });
});
