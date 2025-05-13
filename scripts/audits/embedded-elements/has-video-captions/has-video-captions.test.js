import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasVideoCaptions } from "./has-video-captions.js";

describe("has video captions", () => {
  it("detects video without captions", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <video>
              <source src="video.mp4" type="video/mp4">
            </video>
          </main>
        </body>
      </html>
    `);

    const results = hasVideoCaptions();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores video with captions", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <video>
                <source src="video.mp4" type="video/mp4">
                <track src="captions.vtt" kind="captions" srclang="en" label="captions">
            </video>
          </main>
        </body>
      </html>
    `);

    const results = hasVideoCaptions();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <video style="display: none;">
              <source src="video.mp4" type="video/mp4">
            </video>
          </main>
        </body>
      </html>
    `);

    const results = hasVideoCaptions();
    expect(results).toHaveLength(0);
  });
});
