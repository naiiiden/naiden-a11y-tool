import { describe, it, expect, beforeEach } from 'vitest';
import { hasPageTitle } from './has-page-title.js';

beforeEach(() => {
  chrome.devtools.inspectedWindow.eval.mockReset();
});

describe('hasPageTitle audit', () => {
  it('pushes an error if the document doesn\'t have a <title>', async () => {
    const mockEvalResult = undefined;

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasPageTitle(results);
    expect(results.length).toBe(1);
  });

  it('pushes an error if document has a <title> but it\'s empty', async () => {
    const mockEvalResult = {
      documentTitle: '',
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasPageTitle(results);
    expect(results.length).toBe(1);
  });
});
