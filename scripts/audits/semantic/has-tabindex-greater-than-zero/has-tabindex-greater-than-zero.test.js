import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasTabindexGreaterThanZero } from "./has-tabindex-greater-than-zero.js";

describe("has tabindex greater than zero", () => {
  it("detects tabindex greater than zero", () => {
    setupDOM(`
      <html>
        <body>
          <div>
            <p tabindex="2">hey</p>
          </div>
        </body>
      </html>
    `);

    const results = hasTabindexGreaterThanZero();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores tabindex less than or equal to zero', () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <h1 tabindex="0">hey</h1>
          </main>
        </body>
      </html>
    `);

    const results = hasTabindexGreaterThanZero();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <div role="main" style="display: none;" tabindex="2">main</div>
        </body>
      </html>
    `);

    const results = hasTabindexGreaterThanZero();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
