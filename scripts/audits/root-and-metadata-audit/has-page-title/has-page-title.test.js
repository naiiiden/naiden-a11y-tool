import { describe, it, expect } from 'vitest';
import { setupDOM } from '../../../utils/setup-dom.js';
import { hasPageTitle } from './has-page-title.js';


describe('hasPageTitle audit', () => {
  it('pushes an error if the document doesn\'t have a <title>', async () => {
    setupDOM(`
      <html>
        <head></head>
        <body></body>
      </html>      
    `)

    const results = hasPageTitle();
    expect(results).toBe(undefined);
  });

  it('pushes an error if document has a <title> but it\'s empty', async () => {
    setupDOM(`
      <html>
        <head>
          <title></title>
        </head>
        <body></body>
      </html>      
    `)

    const results = hasPageTitle();
    expect(results.documentTitle).toBe("");
  });
});
