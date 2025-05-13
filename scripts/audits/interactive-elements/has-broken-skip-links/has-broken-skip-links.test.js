import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasBrokenSkipLinks } from "./has-broken-skip-links.js";

describe("has broken skip links", () => {
  it("detects broken skip link", () => {
    setupDOM(`
      <html>
        <body>
          <a href="#main">skip</a>
          <main id="main"></main>
        </body>
      </html>
    `);

    const results = hasBrokenSkipLinks();
    expect(results).toHaveLength(1);
  });

  it('ignores properly implemented skip link', () => {
    setupDOM(`
      <html>
        <body>
          <a href="#main">Skip to content</a>
          <main id="main"></main>
        </body>
      </html>
    `);

    const results = hasBrokenSkipLinks();
    console.log(results);
    expect(results[0].targetExists).toBe(true);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <a href="#main" style="display: none">invisible link</a>
          <main id="main"></main>
        </body>
      </html>
    `);

    const results = hasBrokenSkipLinks();
    expect(results).toHaveLength(0);
  });
});
