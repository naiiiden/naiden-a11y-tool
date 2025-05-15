import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaCommandsNames } from "./aria-command-names.js";

describe("has aria command names", () => {
  it("detects missing aria command names", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="link"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaCommandsNames();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria command with names', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="link" aria-label="hey"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaCommandsNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="link" style="display: none;"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaCommandsNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
