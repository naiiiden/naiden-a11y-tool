import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasVideOrAudioAutoplay } from "./video-audio-no-autoplay.js";

describe("video audio no autoplay", () => {
  it("detects audio with autoplay", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <audio src="/music.mp3" autoplay></audio>
          </main>
        </body>
      </html>
    `);

    Object.defineProperty(document.querySelector("audio"), "duration", {
      value: 10,
    });

    const results = hasVideOrAudioAutoplay();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores audio without autoplay", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <audio src="/music.mp3"></audio>
          </main>
        </body>
      </html>
    `);

    const results = hasVideOrAudioAutoplay();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <audio style="display: none;" src="/music.mp3" autoplay></audio>
          </main>
        </body>
      </html>
    `);

    Object.defineProperty(document.querySelector("audio"), "duration", {
      value: 10,
    });

    const results = hasVideOrAudioAutoplay();
    expect(results).toHaveLength(0);
  });
});
