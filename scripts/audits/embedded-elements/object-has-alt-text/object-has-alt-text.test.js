import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasObjectAltText } from "./object-has-alt-text.js";

describe("has object alt text", () => {
  it("detects object without alt text", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <object data="path/to/content"></object>
          </main>
        </body>
      </html>
    `);

    const results = hasObjectAltText();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores object with alt text", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <object data="path/to/content" aria-label="this object has text"></object>
          </main>
        </body>
      </html>
    `);

    const results = hasObjectAltText();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <object style="display: none;" data="path/to/content"></object>
          </main>
        </body>
      </html>
    `);

    const results = hasObjectAltText();
    expect(results).toHaveLength(0);
  });
});
