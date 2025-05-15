import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasContentinfoInOtherLandmarks } from "./has-contentinfo-in-other-landmarks.js";

describe("has contentinfo in other landmarks", () => {
  it("detects contentinfo in other landmarks", () => {
    setupDOM(`
      <html>
        <body>
          <header>
            <footer>footer</footer>
          </header>
        </body>
      </html>
    `);

    const results = hasContentinfoInOtherLandmarks();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores properly used contentinfo', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <p>hey</p>
          </main>
          <footer>footer</footer>
        </body>
      </html>
    `);

    const results = hasContentinfoInOtherLandmarks();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <header>
            <footer style="display: none;">hi</footer>
          </header>
        </body>
      </html>
    `);

    const results = hasContentinfoInOtherLandmarks();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
