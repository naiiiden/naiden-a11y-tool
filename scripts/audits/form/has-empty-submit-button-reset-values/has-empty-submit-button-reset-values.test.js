import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasEmptySubmitButonOrResetInputValues } from "./has-empty-submit-button-reset-values.js";

describe("has empty submit button or reset values", () => {
  it("detects empty submit button or reset values", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <input type="button" id="hey"/>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptySubmitButonOrResetInputValues();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores non-empty submit buttons or reset values", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <input type="button" value="hey"/>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptySubmitButonOrResetInputValues();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <input style="display: none;" type="button"/>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptySubmitButonOrResetInputValues();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
