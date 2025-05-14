import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasFormControlLabels } from "./has-form-control-labels.js";

describe("has form control labels", () => {
  it("detects form control without labels", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <input type="text" id="hey"/>
          </main>
        </body>
      </html>
    `);

    const results = hasFormControlLabels();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores form control with labels", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <label for="hey">hey</label>
            <input type="text" id="hey"/>
          </main>
        </body>
      </html>
    `);

    const results = hasFormControlLabels();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <input style="display: none;" type="text" id="hey"/>
          </main>
        </body>
      </html>
    `);

    const results = hasFormControlLabels();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
