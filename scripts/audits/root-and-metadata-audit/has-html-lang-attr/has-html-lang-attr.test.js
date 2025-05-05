import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';

function hasMissingHtmlLang(document) {
  const html = document.documentElement;
  const lang = html.getAttribute('lang');
  if (!lang) {
    return {
      outerHTML: html.outerHTML,
      selector: 'html',
    };
  }
  return null;
}

describe('hasMissingHtmlLang', () => {
  it('detects missing lang attribute', () => {
    const dom = new JSDOM(`
        <html>
            <head></head>
            <body></body>
        </html>
    `);
    const result = hasMissingHtmlLang(dom.window.document);
    expect(result).not.toBeNull();
    expect(result.selector).toBe('html');
  });

  it('does not report error when lang is present', () => {
    const dom = new JSDOM(`
        <html lang="en">
            <head></head>
            <body></body>
        </html>
    `);
    const result = hasMissingHtmlLang(dom.window.document);
    expect(result).toBeNull();
  });
});
