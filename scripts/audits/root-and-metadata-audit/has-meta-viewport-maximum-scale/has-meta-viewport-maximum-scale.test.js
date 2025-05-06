import { describe, it, expect } from 'vitest';
import { setupDOM } from '../../../utils/setup-dom.js';
import { hasMetaViewportMaximumScale } from './has-meta-viewport-maximum-scale.js';

describe('hasMetaViewportMaximumScale audit', () => {
  it('detects maximum-scale less than 5.0', () => {
    setupDOM(`
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
          <title>Test</title>
        </head>
        <body></body>
      </html>    
    `);

    const result = hasMetaViewportMaximumScale();
    const match = result.hasContentAttr.match(/maximum-scale\s*=\s*([\d.]+)/i);
    expect(parseFloat(match[1])).toBeLessThan(5.0);
  });

  it('ignores maximum-scale equal or greater than 5.0', () => {
    setupDOM(`
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
          <title>Test</title>
        </head>
        <body></body>
      </html>    
    `);

    const result = hasMetaViewportMaximumScale();
    const match = result.hasContentAttr.match(/maximum-scale\s*=\s*([\d.]+)/i);
    expect(parseFloat(match[1])).toBeGreaterThanOrEqual(5.0);
  });
});