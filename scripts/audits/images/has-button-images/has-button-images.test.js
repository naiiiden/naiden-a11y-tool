import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasButtonImages } from "./has-button-images.js";

describe("has button images", () => {
  it("detects button images without text", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <button>
              <img src="" alt=""/>
            </button>
          </main>
        </body>
      </html>
    `);

    const results = hasButtonImages();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores button images with text", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <button>
              <img src="" alt="hi"/>
            </button>
          </main>
        </body>
      </html>
    `);

    const results = hasButtonImages();
    console.log(results);
    expect(results[0].alt).not.toBe("");
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button style="display: none;">
              <img src="" alt=""/>
            </button>
          </main>
        </body>
      </html>
    `);

    const results = hasButtonImages();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
