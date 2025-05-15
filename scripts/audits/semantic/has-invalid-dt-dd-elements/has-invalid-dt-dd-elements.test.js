import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasInvalidDtDdElements } from "./has-invalid-dt-dd-elements.js";

describe("has invalid dt dd elements", () => {
  it("detects invalid dt dd elements", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <dt>1</dt>
            <dt>2</dt>
          </main>
        </body>
      </html>
    `);

    const results = hasInvalidDtDdElements();
    console.log(results);
    expect(results).toHaveLength(2);
  });

  it('ignores valid dt dd elements', () => {
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

    const results = hasInvalidDtDdElements();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <dt style="display: none;">1</dt>
          </main>
        </body>
      </html>
    `);

    const results = hasInvalidDtDdElements();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
