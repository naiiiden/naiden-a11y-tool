import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAsideInOtherLandmarks } from "./has-aside-in-other-landmarks.js";

describe("has aside in other landmarks", () => {
  it("detects aside in other landmarks", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <aside>hi</aside>
          </main>
        </body>
      </html>
    `);

    const results = hasAsideInOtherLandmarks();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores properly used aside', () => {
    setupDOM(`
      <html>
        <body>
          <aside>hi</aside>
          <main id="main">
            <p>hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasAsideInOtherLandmarks();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <aside style="display: none;">hi</aside>
          </main>
        </body>
      </html>
    `);

    const results = hasAsideInOtherLandmarks();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
