import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasBannersInOtherLandmarks } from "./has-banners-in-other-landmarks.js";

describe("has banners in other landmarks", () => {
  it("detects banners in other landmarks", () => {
    setupDOM(`
      <html>
        <body>
          <footer>
            <header>hi</header>
          </footer>
        </body>
      </html>
    `);

    const results = hasBannersInOtherLandmarks();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores properly used banner', () => {
    setupDOM(`
      <html>
        <body>
          <header>header</header>
          <main id="main">
            <p>hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasBannersInOtherLandmarks();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <footer>
            <header style="display: none;">hi</header>
          </footer>
        </body>
      </html>
    `);

    const results = hasBannersInOtherLandmarks();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
