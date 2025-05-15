import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasMoreThanOneContentinfoLandmark } from "./has-more-than-one-contentinfo-landmark.js";

describe("has more than one contentinfo landmark", () => {
  it("detects more than one contentinfo landmark", () => {
    setupDOM(`
      <html>
        <body>
          <div role="contentinfo">contentinfo</div>
          <div role="contentinfo">contentinfo</div>
          <main>
            <p>hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasMoreThanOneContentinfoLandmark();
    console.log(results);
    expect(results).toBe(2);
  });

  it('ignores if only one contentinfo landmark', () => {
    setupDOM(`
      <html>
        <body>
          <div role="contentinfo">contentinfo</div>
          <main>
            <h1>hey</h1>
          </main>
        </body>
      </html>
    `);

    const results = hasMoreThanOneContentinfoLandmark();
    console.log(results);
    expect(results).toBe(1);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <div role="contentinfo">contentinfo</div>
          <div role="contentinfo" style="display: none;">contentinfo</div>
          <main>
            <h1>hey</h1>
          </main>
        </body>
      </html>
    `);

    const results = hasMoreThanOneContentinfoLandmark();
    console.log(results);
    expect(results).toBe(1);
  });
});
