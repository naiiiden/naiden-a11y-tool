import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasEmptyIframeTitles } from "./iframe-titles.js";

describe("has frame titles", () => {
  it("detects frame without title", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <iframe
              id="inlineFrameExample"
              width="300"
              height="200"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&amp;layer=mapnik">
            </iframe>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyIframeTitles();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores frame with title", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <iframe
              id="inlineFrameExample"
              title="Inline Frame Example"
              width="300"
              height="200"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&amp;layer=mapnik">
            </iframe>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyIframeTitles();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <iframe
              style="display: none;"
              id="inlineFrameExample"
              width="300"
              height="200"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&amp;layer=mapnik">
            </iframe>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyIframeTitles();
    expect(results).toHaveLength(0);
  });
});
