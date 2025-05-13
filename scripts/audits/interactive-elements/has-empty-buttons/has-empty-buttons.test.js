import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasEmptyButtons } from "./has-empty-buttons.js";

describe("has empty buttons", () => {
  it("detects empty buttons", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button></button>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyButtons();
    expect(results).toHaveLength(1);
  });

  it('ignores non-empty buttons', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button>button 1</button>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyButtons();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button style="display: none;"></button>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyButtons();
    expect(results).toHaveLength(0);
  });
});
