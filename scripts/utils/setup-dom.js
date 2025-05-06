import { JSDOM } from 'jsdom';

export function setupDOM(html) {
    const dom = new JSDOM(html);
    global.window = dom.window;
    global.document = dom.window.document;
    return dom;
}