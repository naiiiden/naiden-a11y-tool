import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasMoreThanOneBannerLandmark } from "./has-more-thank-one-banner-landmark.js";

describe("has more than one banner landmark", () => {
  it("detects more than one banner landmark", () => {
    setupDOM(`
      <html>
        <body>
          <div role="banner">banner</div>
          <div role="banner">banner</div>
          <main>
            <p>hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasMoreThanOneBannerLandmark();
    console.log(results);
    expect(results).toBe(2);
  });

  it('ignores if only one banner landmark', () => {
    setupDOM(`
      <html>
        <body>
          <div role="banner">banner</div>
          <main>
            <h1>hey</h1>
          </main>
        </body>
      </html>
    `);

    const results = hasMoreThanOneBannerLandmark();
    console.log(results);
    expect(results).toBe(1);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <div role="banner">banner</div>
          <div role="banner" style="display: none;">banner</div>
          <main>
            <h1>hey</h1>
          </main>
        </body>
      </html>
    `);

    const results = hasMoreThanOneBannerLandmark();
    console.log(results);
    expect(results).toBe(1);
  });
});
