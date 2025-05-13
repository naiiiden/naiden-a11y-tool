import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasInsufficientColourContrast } from "./has-insufficient-colour-contrast.js";

describe("has insufficient color contrast", () => {
  it("detects insufficient color contrast", () => {
    setupDOM(`
      <html>
        <body>
          <main style="background: #fff;">
            <p style="color: #fff;">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasInsufficientColourContrast();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores sufficient color contrast", () => {
    setupDOM(`
      <html>
        <body>
          <main style="background: #fff;">
            <p style="color: #000;">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasInsufficientColourContrast();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main style="background: #fff;">
            <p style="color: #fff; display: none;">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasInsufficientColourContrast();
    expect(results).toHaveLength(0);
  });
});
