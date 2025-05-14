import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasVisibleFormControlLabels } from "./has-form-control-visible-labels.js";

describe("has form control visiblelabels", () => {
  it("detects form control without visible labels", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <input type="text" id="hey" title="hey"/>
          </main>
        </body>
      </html>
    `);

    const results = hasVisibleFormControlLabels();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores form control with visible labels", () => {
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

    const results = hasVisibleFormControlLabels();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <input style="display: none;" type="text" id="hey" title="hey"/>
          </main>
        </body>
      </html>
    `);

    const results = hasVisibleFormControlLabels();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
