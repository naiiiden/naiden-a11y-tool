import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasMetaRefresh } from "./has-meta-refresh.js";

describe("hasMetaRefresh audit", () => {
  it('pushes an error if the document has <meta http-equiv="refresh"> tag', () => {
    setupDOM(`
      <html>
        <head>
          <meta http-equiv="refresh" content="3"/>
          <title>hasMetaRefresh</title>
        </head>
        <body>
        </body>
      </html>    
    `);

    const results = hasMetaRefresh();
    expect(results.hasContentAttr).toBe("3");
  });

  it('does not push an error if document doesn\'t have <meta http-equiv="refresh"> tag', () => {
    setupDOM(`
      <html>
        <head>
          <title>hasMetaRefresh</title>
        </head>
        <body>
        </body>
      </html>    
    `);

    const results = hasMetaRefresh();
    expect(results).toBe(undefined);
  });
});
