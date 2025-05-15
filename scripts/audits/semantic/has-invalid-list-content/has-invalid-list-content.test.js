import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasInvalidListContent } from "./has-invalid-list-content.js";

describe("has invalid list content", () => {
  it("detects invalid list content", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <ul>
              <p>hey</p>
            </ul>
          </main>
        </body>
      </html>
    `);

    const results = hasInvalidListContent();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores valid list content', () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <ul>
              <li>hey</li>
            </ul>
          </main>
        </body>
      </html>
    `);

    const results = hasInvalidListContent();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <ul>
              <p style="display: none;">hey</p>
              <li>hey</li>
            </ul>
          </main>
        </body>
      </html>
    `);

    const results = hasInvalidListContent();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
