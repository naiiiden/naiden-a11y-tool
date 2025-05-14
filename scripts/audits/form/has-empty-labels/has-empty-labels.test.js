import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasEmptyLabels } from "./has-empty-labels.js";

describe("has empty labels", () => {
  it("detects empty labels", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <label for="hey"></label>
            <input type="text" id="hey"/>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyLabels();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores non-empty labels", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <label for="hey">hey</label>
            <input type="text" id="hey"/>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyLabels();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <label style="display: none;" for="hey"></label>
            <input type="text" id="hey"/>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyLabels();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
