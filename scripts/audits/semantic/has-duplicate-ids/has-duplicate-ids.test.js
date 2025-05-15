import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasDuplicateIds } from "./has-duplicate-ids.js";

describe("has duplicate ids", () => {
  it("detects duplicate ids", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p id="id">hey</p>
            <p id="id">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasDuplicateIds();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores unique ids', () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p id="id">hey</p>
            <p id="idk">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasDuplicateIds();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p style="display: none;" id="id">hey</p>
            <p id="id">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasDuplicateIds();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
