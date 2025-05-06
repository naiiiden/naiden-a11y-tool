import { describe, it, expect, beforeEach } from 'vitest';
import { hasMetaRefresh } from './has-meta-refresh.js';

beforeEach(() => {
  chrome.devtools.inspectedWindow.eval.mockReset();
});

describe('hasMetaRefresh audit', () => {
  it('pushes an error if the document has <meta http-equiv="refresh"> tag', async () => {
    const mockEvalResult = {
      hasContentAttr: true,
      outerHTML: `<meta http-equiv="refresh" content="3;url=https://www.mozilla.org"/>`,
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasMetaRefresh(results);
    expect(results.length).toBe(1);
  });

  it('does not push an error if document doesn\'t have <meta http-equiv="refresh"> tag', async () => {
    const mockEvalResult = {
      hasContentAttr: null,
      outerHTML: '<html lang="en"></html>',
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasMetaRefresh(results);
    expect(results.length).toBe(0);
  });
});
