import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasScrollableRegionKeyboardAccess } from "./has-scrollable-region-keyboard-access.js";

describe("has scrollable region keyboard access", () => {
  beforeEach(() => {
    vi.spyOn(window, "getComputedStyle").mockImplementation((el) => {
      return {
        overflow: el.style.overflow || "auto",
        overflowY: el.style.overflowY || "auto",
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("detects scrollable region without keyboard access", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div id="scrollable" style="overflow: auto; height: 100px;">
              <div style="height: 300px;">Just long content, no focusable elements</div>
            </div>
          </main>
        </body>
      </html>
    `);

    const scrollableDiv = document.getElementById("scrollable");
    Object.defineProperties(scrollableDiv, {
      scrollHeight: { get: () => 300 },
      clientHeight: { get: () => 100 },
    });

    const results = hasScrollableRegionKeyboardAccess();
    expect(results[0].hasKeyboardAccess).toBe(false);
  });

  it("ignores scrollable region with keyboard access", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div id="scrollable" style="overflow: auto; height: 100px;" tabindex="0">
              <div style="height: 300px;">Just long content, no focusable elements</div>
            </div>
          </main>
        </body>
      </html>
    `);

    const scrollableDiv = document.getElementById("scrollable");
    Object.defineProperties(scrollableDiv, {
      scrollHeight: { get: () => 300 },
      clientHeight: { get: () => 100 },
    });

    const results = hasScrollableRegionKeyboardAccess();
    expect(results[0].hasKeyboardAccess).toBe(true);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <div id="scrollable" style="overflow: auto; height: 100px; display: none;">
              <div style="height: 300px;">Hidden content</div>
            </div>
          </main>
        </body>
      </html>
    `);

    const scrollableDiv = document.getElementById("scrollable");
    Object.defineProperties(scrollableDiv, {
      scrollHeight: { get: () => 300 },
      clientHeight: { get: () => 100 },
    });

    const results = hasScrollableRegionKeyboardAccess();
    expect(results).toHaveLength(0);
  });
});
