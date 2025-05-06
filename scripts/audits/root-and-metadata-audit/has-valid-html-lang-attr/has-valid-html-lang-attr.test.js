import { describe, it, expect } from 'vitest';
import { setupDOM } from '../../../utils/setup-dom.js';
import { hasValidHtmlLangAttr, validLangValues } from './has-valid-html-lang-attr.js';

describe('hasValidHtmlLangAttr audit', () => {
  it('doesn\'t push an error if lang attribute is a valid language code', () => {
    setupDOM(`
      <html lang="en">
        <head>
          <title>hasHtmlLangAttr</title>
        </head>
        <body>
        </body>
      </html>  
    `)

    const results = hasValidHtmlLangAttr();
    expect(validLangValues.includes(results.hasLangAttr.split('-')[0])).toBe(true);
  });

  it('pushes an error if lang attribute has an invalid language code', () => {
    setupDOM(`
      <html lang="xxx">
        <head>
          <title>hasHtmlLangAttr</title>
        </head>
        <body>
        </body>
      </html>  
    `)

    const results = hasValidHtmlLangAttr();
    expect(validLangValues.includes(results.hasLangAttr.split('-')[0])).toBe(false);
  });
});
