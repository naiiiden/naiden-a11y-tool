import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasLiOutsideList } from "./has-li-outside-list.js";

describe("has li outside list", () => {
  it("detects li outside list", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <li>hey</li>
          </main>
        </body>
      </html>
    `);

    const results = hasLiOutsideList();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it('ignores li inside list', () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <ul>
              <li>hey</li>
            </ul>
          </main>
        </body>
      </html>
    `);

    const results = hasLiOutsideList();
    console.log(results);
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <li style="display: none;">hey</li>
          </main>
        </body>
      </html>
    `);

    const results = hasLiOutsideList();
    console.log(results);
    expect(results).toHaveLength(0);
  });
});
