import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasDuplicateAccesskeys } from "./has-duplicate-accesskey.js";

describe("has duplicate accesskeys", () => {
  it("detects duplicate accesskeys", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button accesskey="g">button 1</button>
            <button accesskey="g">button 2</button>
          </main>
        </body>
      </html>
    `);

    const results = hasDuplicateAccesskeys();
    expect(results[0]).toHaveLength(2);
  });

  it('ignores non-duplicate accesskeys', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button accesskey="g">button 1</button>
            <button accesskey="l">button 2</button>
          </main>
        </body>
      </html>
    `);

    const results = hasDuplicateAccesskeys();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button accesskey="g">button 1</button>
            <button accesskey="g" style="display: none;">button 2</button>
          </main>
        </body>
      </html>
    `);

    const results = hasDuplicateAccesskeys();
    expect(results).toHaveLength(0);
  });
});
