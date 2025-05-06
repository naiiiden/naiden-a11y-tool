import { describe, it, expect } from 'vitest';
import { setupDOM } from '../../../utils/setup-dom.js';
import { hasMetaViewportUserScalableNoOrZero } from './has-meta-viewport-scalable.js';

describe('hasMetaViewportUserScalableNoOrZero audit', () => {
  it('pushes an error if user-scalable=no is present', async () => {
    setupDOM(`
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
          <title>Test</title>
        </head>
        <body></body>
      </html>    
    `);

    const results = hasMetaViewportUserScalableNoOrZero();
    expect(results.hasContentAttr).toContain('user-scalable=no');
  });

  it('pushes an error if user-scalable=0 is present', async () => {
    setupDOM(`
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
          <title>Test</title>
        </head>
        <body></body>
      </html>    
    `);

    const results = hasMetaViewportUserScalableNoOrZero();
    expect(results.hasContentAttr).toContain('user-scalable=0');

  });

  it('does not push an error if user-scalable is not present', async () => {
    setupDOM(`
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
          <title>Test</title>
        </head>
        <body></body>
      </html>    
    `);

    const results = hasMetaViewportUserScalableNoOrZero();
    console.log(results);
    expect(results.hasContentAttr).not.toContain('user-scalable');
  });
});
