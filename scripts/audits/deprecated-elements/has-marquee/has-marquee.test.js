import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasMarquee } from "./has-marquee.js";

describe("has marquee", () => {
  it("detects marquee", () => {
    setupDOM(`
      <html>
        <body>
          <marquee>hey</marquee>
        </body>
      </html>
    `);

    const results = hasMarquee();
    expect(results).toHaveLength(1);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <marquee style="display: none">hey</marquee>
          </main>
        </body>
      </html>
    `);

    const results = hasMarquee();
    expect(results).toHaveLength(0);
  });
});
