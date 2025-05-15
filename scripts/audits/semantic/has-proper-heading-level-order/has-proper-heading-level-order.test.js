import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasProperHeadingLevelOrder } from "./has-proper-heading-level-order.js";

describe("has proper heading level order", () => {
  it("detects improper heading level order", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <h2>hey</h2>
            <h3>hey</h6>
            <h6>hey</h6>
          </main>
        </body>
      </html>
    `);

    const results = hasProperHeadingLevelOrder();
    console.log(results);
    expect(results[0].level).toBe(2);
    expect(results[1].level).toBe(3);
    expect(results[2].level).toBe(6);
  });

  it("ignores proper heading level order", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <h1>hey</h1>
            <h2>hey</h2>
            <h3>hey</h3>
          </main>
        </body>
      </html>
    `);

    const results = hasProperHeadingLevelOrder();
    console.log(results);
    expect(results[0].level).toBe(1);
    expect(results[1].level).toBe(2);
    expect(results[2].level).toBe(3);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <h1>hey</h1>
            <h6 style="display: none;">hey</h6>
            <h2>hey</h2>
            <h3>hey</h3>
          </main>
        </body>
      </html>
    `);

    const results = hasProperHeadingLevelOrder();
    console.log(results);
    expect(results[0].level).toBe(1);
    expect(results[1].level).toBe(2);
    expect(results[2].level).toBe(3);
  });
});
