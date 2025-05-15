import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasMoreThanOneMainLandmark } from "./has-more-than-one-main-landmark.js";

describe("has more than one main landmark", () => {
  it("detects more than one main landmark", () => {
    setupDOM(`
      <html>
        <body>
          <div role="main">main</div>
          <div role="main">main</div>
          <main>
            <p>hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasMoreThanOneMainLandmark();
    console.log(results);
    expect(results).toHaveLength(3);
  });

  it('ignores if only one main landmark', () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <h1>hey</h1>
          </main>
        </body>
      </html>
    `);

    const results = hasMoreThanOneMainLandmark();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <div role="main" style="display: none;">main</div>
          <main>
            <h1>hey</h1>
          </main>
        </body>
      </html>
    `);

    const results = hasMoreThanOneMainLandmark();
    console.log(results);
    expect(results).toHaveLength(1);
  });
});
