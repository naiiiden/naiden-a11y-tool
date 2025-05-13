import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasInteractiveControlsWithInteractiveControlsAsChildren } from "./has-interactive-controls-w-interactive-children.js";

describe("has interactive controls with interactive controls as children", () => {
  it("detects interactive controls with interactive controls as children", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button>
              <a href="">hey</a>
            </button>
          </main>
        </body>
      </html>
    `);

    const results = hasInteractiveControlsWithInteractiveControlsAsChildren();
    expect(results).toHaveLength(1);
  });

  it('ignores interactive controls without interactive controls as children', () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button>button</button>
          </main>
        </body>
      </html>
    `);

    const results = hasInteractiveControlsWithInteractiveControlsAsChildren();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button>
              <a href="" style="display: none;">hey</a>
            </button>
          </main>
        </body>
      </html>
    `);

    const results = hasInteractiveControlsWithInteractiveControlsAsChildren();
    expect(results).toHaveLength(0);
  });
});
