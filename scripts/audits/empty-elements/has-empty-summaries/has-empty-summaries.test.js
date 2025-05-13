import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasEmptyOrMissingSummaries } from "./has-empty-summaries.js";

describe("has empty summaries", () => {
  it("detects empty summaries", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <details>
              <summary></summary>
              hey
            </details>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyOrMissingSummaries();
    expect(results).toHaveLength(1);
  });

  it('ignores non-empty summaries', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <details>
              <summary>hey</summary>
              hey
            </details>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyOrMissingSummaries();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <details style="display: none">
              <summary></summary>
              hey
            </details>
          </main>
        </body>
      </html>
    `);

    const results = hasEmptyOrMissingSummaries();
    expect(results).toHaveLength(0);
  });
});
