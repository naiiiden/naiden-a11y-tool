import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasBypass } from "./has-bypass.js";

describe("has bypass", () => {
  it("detects missing bypass", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            hey
          </main>
        </body>
      </html>
    `);

    const results = hasBypass();
    console.log(results);
    expect(results.skipLinks).toHaveLength(0);
  });

  it('ignores existing bypass', () => {
    setupDOM(`
      <html>
        <body>
          <a href="#">skip</a>
          <main>
            hey
          </main>
        </body>
      </html>
    `);

    const results = hasBypass();
    console.log(results);
    expect(results.skipLinks).toHaveLength(1);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <a href="#" style="display: none;">skip</a>
          <main>
            hey
          </main>
        </body>
      </html>
    `);

    const results = hasBypass();
    console.log(results);
    expect(results.skipLinks).toHaveLength(0);
  });
});
