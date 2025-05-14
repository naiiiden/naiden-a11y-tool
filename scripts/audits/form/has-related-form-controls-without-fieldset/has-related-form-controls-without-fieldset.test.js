import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasRelatedFormControlsMissingFieldset } from "./has-related-form-controls-without-fieldset.js.js";

describe("has related form control without fieldset", () => {
  it("detects related form control without fieldset", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <input type="checkbox" id="hey" name="this" title="hey"/>
            <input type="checkbox" id="hey" name="this" title="hey"/>
            <input type="checkbox" id="hey" name="this" title="hey"/>
          </main>
        </body>
      </html>
    `);

    const results = hasRelatedFormControlsMissingFieldset();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores related form control with fieldset", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <fieldset>
              <legend>hey</legend>
              <input type="checkbox" id="hey" name="this" title="hey"/>
              <input type="checkbox" id="hey" name="this" title="hey"/>
              <input type="checkbox" id="hey" name="this" title="hey"/>
            </fieldset>
          </main>
        </body>
      </html>
    `);

    const results = hasRelatedFormControlsMissingFieldset();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <input type="checkbox" name="this" id="hey"/>
            <input style="display: none;" type="checkbox" name="this" id="hey"/>
            <input style="display: none;" type="checkbox" name="this" id="hey"/>
          </main>
        </body>
      </html>
    `);

    const results = hasRelatedFormControlsMissingFieldset();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
