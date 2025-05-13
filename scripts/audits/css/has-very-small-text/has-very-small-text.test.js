import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasVerySmallText } from "./has-very-small-text.js";

describe("has very small text", () => {
  it("detects very small text", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p style="font-size: 10px">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasVerySmallText();
    expect(results).toHaveLength(1);
  });

  it("ignores normal size text", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p style="font-size: 16px">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasVerySmallText();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <p style="font-size: .5rem; display: none;">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasVerySmallText();
    expect(results).toHaveLength(0);
  });
});
