import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasUnadjustableTextProperties } from "./has-unadjustable-text-properties.js";

describe("has unadjustable text properties", () => {
  it("detects unadjustable text properties", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p style="font-size: 16px !important;">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasUnadjustableTextProperties();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores adjustable text properties", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p style="font-size: 16px;">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasUnadjustableTextProperties();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <p style="text-decoration: line-through; display: none;">hey</p>
          </main>
        </body>
      </html>
    `);

    const results = hasUnadjustableTextProperties();
    expect(results).toHaveLength(0);
  });
});
