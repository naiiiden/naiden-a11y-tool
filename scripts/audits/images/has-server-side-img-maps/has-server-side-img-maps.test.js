import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasServerSideImgMaps } from "./has-server-side-img-maps.js";

describe("has server side img map", () => {
  it("detects server side img map", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <a href="worldmap.map"><img src="worldmap.gif" ismap></a>
          </main>
        </body>
      </html>
    `);

    const results = hasServerSideImgMaps();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <a style="display: none;" href="worldmap.map"><img src="worldmap.gif" ismap></a>
          </main>
        </body>
      </html>
    `);

    const results = hasServerSideImgMaps();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
