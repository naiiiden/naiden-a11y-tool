import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasRedundantImgAlt } from "./has-image-redundant-alt.js";

describe("has images redundant alt", () => {
  it("detects images redundant alt", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <button>
              hi
              <img src="" alt="hi"/>
            </button>
          </main>
        </body>
      </html>
    `);

    const results = hasRedundantImgAlt();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores non-redundant images alt", () => {
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

    const results = hasRedundantImgAlt();
    console.log(results);
    expect(results).toHaveLength(0);
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

    const results = hasRedundantImgAlt();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
