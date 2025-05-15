import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasContentOutsideLandmarks } from "./has-content-outside-landmarks.js";

describe("has content outside landmarks", () => {
  it("detects content outside landmarks", () => {
    setupDOM(`
      <html>
        <body>
          <h1>hey</h1>
          <main>
            hey
          </main>
        </body>
      </html>
    `);

    const results = hasContentOutsideLandmarks();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores content in landmarks', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <p>hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasContentOutsideLandmarks();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <h1 style="display: none;">hey</h1>
          <main>
            hey
          </main>
        </body>
      </html>
    `);

    const results = hasContentOutsideLandmarks();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
