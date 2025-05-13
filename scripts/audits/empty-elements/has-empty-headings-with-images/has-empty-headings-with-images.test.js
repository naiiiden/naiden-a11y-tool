import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasEmptyHeadingsWithImages } from "./has-empty-headings-with-images.js";

describe("has empty headings with images", () => {
  it("detects empty headings with images", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <h1>
              <img src="" alt=""/>
            </h1>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyHeadingsWithImages();
    expect(results[0].hasImageAlt).toBe(false);
  });

  it('ignores non-empty headings with images', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <h1>
              <img src="" alt="hey"/>
            </h1>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyHeadingsWithImages();
    expect(results[0].hasImageAlt).toBe(true);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <h1 style="display: none;">
              <img src="" alt=""/>
            </h1>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyHeadingsWithImages();
    expect(results).toHaveLength(0);
  });
});
