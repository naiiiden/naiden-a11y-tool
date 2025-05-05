import { describe, it, expect, vi, beforeEach } from 'vitest';
import { hasHtmlLangAttr } from './has-html-lang-attr.js';

// Mock chrome.devtools.inspectedWindow.eval
global.chrome = {
  devtools: {
    inspectedWindow: {
      eval: vi.fn()
    }
  }
};

beforeEach(() => {
  chrome.devtools.inspectedWindow.eval.mockReset();
});

describe('hasHtmlLangAttr audit', () => {
  it('pushes an error if <html> has no lang attribute', async () => {
    const mockEvalResult = {
      hasLangAttr: null,
      outerHTML: '<html></html>',
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasHtmlLangAttr(results);
    expect(results.length).toBe(1);
  });

  it('does not push an error if <html> has lang attribute', async () => {
    const mockEvalResult = {
      hasLangAttr: 'en',
      outerHTML: '<html lang="en"></html>',
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasHtmlLangAttr(results);
    expect(results.length).toBe(0);
  });
});
