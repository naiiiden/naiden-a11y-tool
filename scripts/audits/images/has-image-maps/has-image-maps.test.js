import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasImageMaps } from "./has-image-maps.js";

describe("has image maps", () => {
  it("detects image maps without alt", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <map name="infographic">
              <area
                shape="poly"
                coords="130,147,200,107,254,219,130,228"
                href="https://developer.mozilla.org/docs/Web/HTML"
                alt="HTML" 
              />
              <area
                shape="poly"
                coords="130,147,130,228,6,219,59,107"
                href="https://developer.mozilla.org/docs/Web/CSS"
                alt="CSS" 
              />
              <area
                shape="poly"
                coords="130,147,200,107,130,4,59,107"
                href="https://developer.mozilla.org/docs/Web/JavaScript"
                alt="JavaScript" 
              />
            </map>
            <img
              usemap="#infographic"
              src="/shared-assets/images/examples/mdn-info2.png" 
            />
          </main>
        </body>
      </html>
    `);

    const results = hasImageMaps();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("detects image maps without area alt", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <map name="infographic">
              <area
                shape="poly"
                coords="130,147,200,107,254,219,130,228"
                href="https://developer.mozilla.org/docs/Web/HTML"
              />
              <area
                shape="poly"
                coords="130,147,130,228,6,219,59,107"
                href="https://developer.mozilla.org/docs/Web/CSS"
              />
              <area
                shape="poly"
                coords="130,147,200,107,130,4,59,107"
                href="https://developer.mozilla.org/docs/Web/JavaScript"
              />
            </map>
            <img
              usemap="#infographic"
              src="/shared-assets/images/examples/mdn-info2.png" 
            />
          </main>
        </body>
      </html>
    `);

    const results = hasImageMaps();
    console.log(results);
    expect(results[0].areas).toHaveLength(3);
  });

  it("ignores image maps with alt", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <map name="infographic">
              <area
                shape="poly"
                coords="130,147,200,107,254,219,130,228"
                href="https://developer.mozilla.org/docs/Web/HTML"
                alt="HTML" 
              />
              <area
                shape="poly"
                coords="130,147,130,228,6,219,59,107"
                href="https://developer.mozilla.org/docs/Web/CSS"
                alt="CSS" 
              />
              <area
                shape="poly"
                coords="130,147,200,107,130,4,59,107"
                href="https://developer.mozilla.org/docs/Web/JavaScript"
                alt="JavaScript" 
              />
            </map>
            <img
              usemap="#infographic"
              src="/shared-assets/images/examples/mdn-info2.png"
              alt="MDN infographic" 
            />
          </main>
        </body>
      </html>
    `);

    const results = hasImageMaps();
    console.log(results);
    expect(results[0].alt).not.toBe("");
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <map name="infographic">
              <area
                shape="poly"
                coords="130,147,200,107,254,219,130,228"
                href="https://developer.mozilla.org/docs/Web/HTML"
                alt="HTML" 
              />
              <area
                shape="poly"
                coords="130,147,130,228,6,219,59,107"
                href="https://developer.mozilla.org/docs/Web/CSS"
                alt="CSS" 
              />
              <area
                shape="poly"
                coords="130,147,200,107,130,4,59,107"
                href="https://developer.mozilla.org/docs/Web/JavaScript"
                alt="JavaScript" 
              />
            </map>
            <img
              style="display: none;"
              usemap="#infographic"
              src="/shared-assets/images/examples/mdn-info2.png"
            />
          </main>
        </body>
      </html>
    `);

    const results = hasImageMaps();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
