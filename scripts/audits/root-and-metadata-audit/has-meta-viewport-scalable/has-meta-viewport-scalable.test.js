import { describe, it, expect, beforeEach } from 'vitest';
import { hasMetaViewportUserScalableNoOrZero } from './has-meta-viewport-scalable.js';

beforeEach(() => {
  chrome.devtools.inspectedWindow.eval.mockReset();
});

describe('hasMetaViewportUserScalableNoOrZero audit', () => {
  it('pushes an error if user-scalable=no is present', async () => {
    const mockEvalResult = {
      hasContentAttr: 'width=device-width, user-scalable=no',
      outerHTML: '<meta name="viewport" content="width=device-width, user-scalable=no">',
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasMetaViewportUserScalableNoOrZero(results);
    expect(results.length).toBe(1);
  });

  it('pushes an error if user-scalable=0 is present', async () => {
    const mockEvalResult = {
      hasContentAttr: 'width=device-width, user-scalable=0',
      outerHTML: '<meta name="viewport" content="width=device-width, user-scalable=0">',
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasMetaViewportUserScalableNoOrZero(results);
    expect(results.length).toBe(1);
  });

  it('does not push an error if user-scalable is not present', async () => {
    const mockEvalResult = {
      hasContentAttr: 'width=device-width, initial-scale=1.0',
      outerHTML: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasMetaViewportUserScalableNoOrZero(results);
    expect(results.length).toBe(0);
  });

  it('does not push an error if meta viewport tag is missing', async () => {
    const mockEvalResult = null;

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasMetaViewportUserScalableNoOrZero(results);
    expect(results.length).toBe(0);
  });
});
