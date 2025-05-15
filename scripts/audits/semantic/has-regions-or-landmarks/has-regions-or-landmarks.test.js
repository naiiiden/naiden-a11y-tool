import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasRegionsOrLandmarks } from "./has-regions-or-landmarks.js";

describe("has regions or landmarks", () => {
  it("detects no regions or landmarks", () => {
    setupDOM(`
      <html>
        <body>
          <div>
            <p>hey</p>
          </div>
        </body>
      </html>
    `);

    const results = hasRegionsOrLandmarks();
    console.log(results);
    expect(results).toBe(0);
  });

  it('ignores regions or landmark', () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <h1>hey</h1>
          </main>
        </body>
      </html>
    `);

    const results = hasRegionsOrLandmarks();
    console.log(results);
    expect(results).toBe(1);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <div role="main" style="display: none;">main</div>
        </body>
      </html>
    `);

    const results = hasRegionsOrLandmarks();
    console.log(results);
    expect(results).toBe(0);
  });
});
