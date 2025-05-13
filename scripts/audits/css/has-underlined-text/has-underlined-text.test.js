import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasUnderlinedText } from "./has-underlined-text.js";

describe("has underlined text", () => {
  it("detects underlined text", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p style="text-decoration: underline;">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasUnderlinedText();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores non-underlined text", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p style="text-decoration: line-through;">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasUnderlinedText();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <p style="text-decoration: underline; display: none;">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasUnderlinedText();
    expect(results).toHaveLength(0);
  });
});
