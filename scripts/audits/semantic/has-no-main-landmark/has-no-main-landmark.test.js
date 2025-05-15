import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasNoMainLandmark } from "./has-no-main-landmark.js";

describe("has no main landmark", () => {
  it("detects no main landmark", () => {
    setupDOM(`
      <html>
        <body>
          <div>
            <p>hey</p>
          </div>
        </body>
      </html>
    `);

    const results = hasNoMainLandmark();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it('ignores if main landmark', () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <h1>hey</h1>
          </main>
        </body>
      </html>
    `);

    const results = hasNoMainLandmark();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <div role="main" style="display: none;">main</div>
        </body>
      </html>
    `);

    const results = hasNoMainLandmark();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
