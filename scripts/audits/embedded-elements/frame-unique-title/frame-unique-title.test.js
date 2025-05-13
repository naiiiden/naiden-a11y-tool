import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasFrameUniqueTitles } from "./frame-unique-title.js";

describe("has frame unique titles", () => {
  it("detects frame non-unique titles", () => {
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

    const results = hasFrameUniqueTitles();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores frame unique titles", () => {
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

    const results = hasFrameUniqueTitles();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <iframe
              id="inlineFrameExample"
              title="Inline Frame Example"
              width="300"
              height="200"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&amp;layer=mapnik">
            </iframe>
            <iframe
              style="display: none;"
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

    const results = hasFrameUniqueTitles();
    expect(results).toHaveLength(0);
  });
});
