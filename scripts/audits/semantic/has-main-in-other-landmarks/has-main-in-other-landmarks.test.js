import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasMainInOtherLandmarks } from "./has-main-in-other-landmarks.js";

describe("has main in other landmarks", () => {
  it("detects main in other landmarks", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <main>hi</main>
          </main>
        </body>
      </html>
    `);

    const results = hasMainInOtherLandmarks();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores properly used main', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <p>hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasMainInOtherLandmarks();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <main style="display: none;">hi</main>
          </main>
        </body>
      </html>
    `);

    const results = hasMainInOtherLandmarks();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
