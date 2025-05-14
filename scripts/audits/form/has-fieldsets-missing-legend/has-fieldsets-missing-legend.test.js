import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasFieldsetsMissingLegend } from "./has-fieldsets-missing-legend.js";

describe("has fieldsets missing legend", () => {
  it("detects fieldsets missing legend", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <fieldset>
              <input type="radio" value="1"/>
              <input type="radio" value="1"/>
              <input type="radio" value="1"/>
            </fieldset>
          </main>
        </body>
      </html>
    `);

    const results = hasFieldsetsMissingLegend();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores fieldset with legend", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <fieldset>
              <legend>legend</legend>
              <input type="radio" value="1"/>
              <input type="radio" value="1"/>
              <input type="radio" value="1"/>
            </fieldset>
          </main>
        </body>
      </html>
    `);

    const results = hasFieldsetsMissingLegend();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <fieldset style="display: none;">
              <input type="radio" value="1"/>
              <input type="radio" value="1"/>
              <input type="radio" value="1"/>
            </fieldset>
          </main>
        </body>
      </html>
    `);

    const results = hasFieldsetsMissingLegend();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
