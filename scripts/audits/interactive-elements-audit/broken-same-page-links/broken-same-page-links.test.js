import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';
import { hasBrokenSamePageLinks } from './broken-same-page-links.js';

describe('findBrokenSamePageLinks', () => {
  it('detects broken same-page links', () => {
    const dom = new JSDOM(`
      <html>
        <body>
          <a href="#nonexistent">Go to nowhere</a>
          <a href="#existent">Go to existent</a>
          <main id="existent"></main>
        </body>
      </html>
    `);

    const results = hasBrokenSamePageLinks(dom.window.document, () => '', () => true);
    expect(results).toHaveLength(2);
    expect(results[0].targetExists).toBe(false);
  });

  it('ignores links with "skip" or "jump" in the text', () => {
    const dom = new JSDOM(`
      <html>
        <body>
          <a href="#nonexistent">Skip to content</a>
          <a href="#nonexistent">Jump to section</a>
        </body>
      </html>
    `);

    const results = hasBrokenSamePageLinks(dom.window.document, () => '', () => true);
    expect(results).toHaveLength(0);
  });

  it('ignores invisible elements', () => {
    const dom = new JSDOM(`
      <html>
        <body>
          <a href="#nonexistent">Visible link</a>
        </body>
      </html>
    `);

    const results = hasBrokenSamePageLinks(dom.window.document, () => '', () => false);
    expect(results).toHaveLength(0);
  });
});