import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasMissingAltImages } from "./has-missing-alt-images.js";

describe("has missing alt images", () => {
  it("detects images with missing alt", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <img src=""/>
          </main>
        </body>
      </html>
    `);

    const results = hasMissingAltImages();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores images with alt", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <img src="" alt="hi"/>
          </main>
        </body>
      </html>
    `);

    const results = hasMissingAltImages();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <img style="display: none;" src="" alt=""/>
          </main>
        </body>
      </html>
    `);

    const results = hasMissingAltImages();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
