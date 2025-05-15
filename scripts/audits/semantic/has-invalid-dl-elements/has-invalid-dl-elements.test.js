import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasInvalidDlElements } from "./has-invalid-dl-elements.js";

describe("has invalid dl elements", () => {
  it("detects invalid dl elements", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <dl>
              <dt>1</dt>
              <dt>2</dt>
            </dl>
          </main>
        </body>
      </html>
    `);

    const results = hasInvalidDlElements();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores valid dl elements', () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <dl>
              <dt>1</dt>
              <dd>2</dd>
            </dl>
          </main>
        </body>
      </html>
    `);

    const results = hasInvalidDlElements();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <dl style="display: none;">
              <dt>1</dt>
              <dt>2</dt>
            </dl>
          </main>
        </body>
      </html>
    `);

    const results = hasInvalidDlElements();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
