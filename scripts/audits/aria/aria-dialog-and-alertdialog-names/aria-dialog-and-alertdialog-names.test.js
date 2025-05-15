import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasAriaDialogAndAlertDialogNames } from "./aria-dialog-and-alertdialog-names.js";

describe("has aria dialog and alertdialog names", () => {
  it("detects missing aria dialog and alertdialog names", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="dialog"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaDialogAndAlertDialogNames();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores aria dialog and alertdialog with names', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="dialog" aria-label="hey"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaDialogAndAlertDialogNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div role="dialog" style="display: none;"></div>
          </main>
        </body>
      </html>
    `);

    const results = hasAriaDialogAndAlertDialogNames();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
