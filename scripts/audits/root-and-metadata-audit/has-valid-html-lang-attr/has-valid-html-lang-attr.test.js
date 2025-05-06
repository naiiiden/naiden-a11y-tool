import { describe, it, expect, beforeEach } from 'vitest';
import { hasValidHtmlLangAttr } from './has-valid-html-lang-attr.js';

beforeEach(() => {
  chrome.devtools.inspectedWindow.eval.mockReset();
});

describe('hasValidHtmlLangAttr audit', () => {
  it('doesn\'t push an error if lang attribute is a valid language code', async () => {
    const mockEvalResult = {
      hasLangAttr: 'en',
      outerHTML: '<html lang="en"></html>',
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasValidHtmlLangAttr(results);
    expect(results.length).toBe(0);
  });

  it('doesn\'t push an error if lang is a valid code', async () => {
    const mockEvalResult = {
      hasLangAttr: 'en-US',
      outerHTML: '<html lang="en-US"></html>',
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasValidHtmlLangAttr(results);
    expect(results.length).toBe(0);
  });

  it('pushes an error if lang attribute has an invalid language code', async () => {
    const mockEvalResult = {
      hasLangAttr: 'xx',
      outerHTML: '<html lang="xx"></html>',
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasValidHtmlLangAttr(results);
    expect(results.length).toBe(1);
  });

  it('does NOT push an error if lang attribute is missing', async () => {
    const mockEvalResult = {
      hasLangAttr: null,
      outerHTML: '<html></html>',
    };

    chrome.devtools.inspectedWindow.eval.mockImplementation((code, callback) => {
      callback(mockEvalResult);
    });

    const results = [];
    await hasValidHtmlLangAttr(results);
    expect(results.length).toBe(0);
  });
});
