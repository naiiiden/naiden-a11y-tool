import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasLinkedImages } from "./has-linked-images.js";

describe("has linked images", () => {
  it("detects linked image with no text", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <a href="">
              <img src="" alt=""/>
            </a>
          </main>
        </body>
      </html>
    `);

    const results = hasLinkedImages();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores linked images with alt", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <a href="">
              <img src="" alt="hi"/>
            </a>
          </main>
        </body>
      </html>
    `);

    const results = hasLinkedImages();
    console.log(results);
    expect(results[0]).not.toBe(null);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <a href="" style="display: none;">
              <img src="" alt=""/>
            </a>
          </main>
        </body>
      </html>
    `);

    const results = hasLinkedImages();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
