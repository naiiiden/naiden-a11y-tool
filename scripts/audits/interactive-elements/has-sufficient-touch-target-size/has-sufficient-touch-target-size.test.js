import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasSufficientTouchTargetSize } from "./has-sufficient-touch-target-size.js";

describe("hasSufficientTouchTargetSize", () => {
  it("detects insufficient touch target size", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button id="btn1" style="width: 20px; height: 20px; position: absolute; top: 10px; left: 10px;">1</button>
            <button id="btn2" style="width: 20px; height: 20px; position: absolute; top: 10px; left: 20px;">2</button>
          </main>
        </body>
      </html>
    `);

    const mockRect1 = { width: 20, height: 20, left: 10, top: 10, right: 30, bottom: 30 };
    const mockRect2 = { width: 20, height: 20, left: 20, top: 10, right: 40, bottom: 30 };
    
    document.getElementById("btn1").getBoundingClientRect = () => mockRect1;
    document.getElementById("btn2").getBoundingClientRect = () => mockRect2;

    const results = hasSufficientTouchTargetSize();
    expect(results).toHaveLength(2);
  });

  it("ignores sufficient touch target size", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button id="btn1" style="width: 44px; height: 44px; position: absolute; top: 10px; left: 10px;">1</button>
            <button id="btn2" style="width: 44px; height: 44px; position: absolute; top: 10px; left: 70px;">2</button>
          </main>
        </body>
      </html>
    `);

    const mockRect1 = { width: 44, height: 44, left: 10, top: 10, right: 54, bottom: 54 };
    const mockRect2 = { width: 44, height: 44, left: 70, top: 10, right: 114, bottom: 54 };
    
    document.getElementById("btn1").getBoundingClientRect = () => mockRect1;
    document.getElementById("btn2").getBoundingClientRect = () => mockRect2;

    const results = hasSufficientTouchTargetSize();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <button id="btn1" style="width: 20px; height: 20px; position: absolute; top: 10px; left: 10px;">1</button>
            <button id="btn2" style="width: 20px; height: 20px; position: absolute; top: 10px; left: 20px; display: none;">2</button>
          </main>
        </body>
      </html>
    `);

    const mockRect1 = { width: 20, height: 20, left: 10, top: 10, right: 30, bottom: 30 };
    const mockRect2 = { width: 20, height: 20, left: 20, top: 10, right: 40, bottom: 30 };
    
    document.getElementById("btn1").getBoundingClientRect = () => mockRect1;
    document.getElementById("btn2").getBoundingClientRect = () => mockRect2;

    const results = hasSufficientTouchTargetSize();
    expect(results).toHaveLength(0);
  });
});