import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasSvgRoleImgMissingAlt } from "./has-svg-role-img-missing-alt.js";

describe("has svg role img", () => {
  it("detects svg role img with missing alt", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <svg role="img" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke-width="4" fill="red"/>
            </svg>
          </main>
        </body>
      </html>
    `);

    const results = hasSvgRoleImgMissingAlt();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores svg role img with alt", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <svg role="img" aria-label="hi" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke-width="4" fill="red"/>
            </svg>
          </main>
        </body>
      </html>
    `);

    const results = hasSvgRoleImgMissingAlt();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <svg style="display: none;" role="img" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke-width="4" fill="red"/>
            </svg>
          </main>
        </body>
      </html>
    `);

    const results = hasSvgRoleImgMissingAlt();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
