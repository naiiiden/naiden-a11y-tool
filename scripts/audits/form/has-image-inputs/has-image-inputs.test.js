import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasImageInputs } from "./has-image-inputs.js";

describe("has image inputs alt", () => {
  it("detects image inputs without alt", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <input type="image"/>
          </main>
        </body>
      </html>
    `);

    const results = hasImageInputs();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores image inputs with alt", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <input type="image" aria-label="hi"/>
          </main>
        </body>
      </html>
    `);

    const results = hasImageInputs();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <input style="display: none;" type="image"/>
          </main>
        </body>
      </html>
    `);

    const results = hasImageInputs();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
