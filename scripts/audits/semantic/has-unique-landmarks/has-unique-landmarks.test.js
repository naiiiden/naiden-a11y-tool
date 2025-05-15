import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasUniqueLandmarks } from "./has-unique-landmarks.js";

describe("has unique landmarks", () => {
  it("detects non-unique landmarks", () => {
    setupDOM(`
      <html>
        <body>
          <main>main</main>
          <main>main</main>
        </body>
      </html>
    `);

    const results = hasUniqueLandmarks();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores unique landmarks', () => {
    setupDOM(`
      <html>
        <body>
          <main title="main1">main</main>
          <main title="main2">main</main>
        </body>
      </html>
    `);

    const results = hasUniqueLandmarks();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main>main</main>
          <main style="display: none;">main</main>
        </body>
      </html>
    `);

    const results = hasUniqueLandmarks();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
