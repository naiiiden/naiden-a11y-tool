import { describe, it, expect, beforeEach } from 'vitest';
import { hasMetaViewportMaximumScale } from './has-meta-viewport-maximum-scale.js';

beforeEach(() => {
  chrome.devtools.inspectedWindow.eval.mockReset();
});

describe('hasMetaViewportMaximumScale audit', () => {
  it('pushes an error if maximum-scale is less than 5.0', async () => {
    const mockEvalResult = {
      hasContentAttr: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
      outerHTML: `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">`,
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasMetaViewportMaximumScale(results);
    expect(results.length).toBe(1);
  });

  it('does not push an error if maximum-scale is 5.0 or more', async () => {
    const mockEvalResult = {
      hasContentAttr: 'width=device-width, maximum-scale=5.0',
      outerHTML: `<meta name="viewport" content="width=device-width, maximum-scale=5.0">`,
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasMetaViewportMaximumScale(results);
    expect(results.length).toBe(0);
  });

  it('does not push an error if maximum-scale is not present', async () => {
    const mockEvalResult = {
      hasContentAttr: 'width=device-width, initial-scale=1.0',
      outerHTML: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasMetaViewportMaximumScale(results);
    expect(results.length).toBe(0);
  });

  it('does not push an error if meta viewport tag is not present', async () => {
    const mockEvalResult = null;

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasMetaViewportMaximumScale(results);
    expect(results.length).toBe(0);
  });
});
