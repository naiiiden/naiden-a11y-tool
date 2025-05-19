import { describe, it, expect } from "vitest";
import { setupDOM } from "../../../utils/setup-dom.js";
import { hasJustifiedText } from "./has-justified-text.js";

describe("has justified text", () => {
  it("detects justified text", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p style="text-align: justify;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies nisi nunc, vel iaculis magna lobortis et. Nunc urna dui, dictum vel tellus sed, fringilla lobortis velit. Pellentesque venenatis mollis dolor eget cursus. Curabitur sodales mollis purus, quis molestie nulla commodo a. Maecenas et lacinia risus. Donec sodales, ipsum a gravida porttitor, metus purus luctus augue, eu pellentesque justo tellus non dolor. Mauris rutrum dui augue, vel dictum lacus lobortis id.
              Fusce interdum nisi at sapien rhoncus consectetur. Duis nec sem et tellus cursus sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet quam sit amet urna tempus ultricies. Quisque et tincidunt quam, vel viverra ante. Cras sed pretium velit, eu vulputate ligula. Donec eleifend felis vel urna pellentesque, ac lacinia diam luctus. Mauris commodo dui vehicula hendrerit efficitur. Aliquam arcu ex, ultricies vitae pretium at, eleifend vitae nisl. Donec efficitur egestas erat id molestie. Ut congue luctus ultricies. Aenean suscipit volutpat orci, ut accumsan mauris.
              Aliquam id ex auctor, scelerisque purus ut, pellentesque metus. Morbi interdum feugiat ex, a interdum nisi ultricies ut. Quisque at dignissim purus, vitae sollicitudin turpis. Curabitur pretium at dui et aliquet. Donec fringilla nulla nec justo vulputate volutpat. Ut iaculis lacus in placerat facilisis. Cras mi nunc, volutpat id condimentum interdum, sodales sit amet felis. Integer iaculis magna id libero tristique volutpat. Donec ut dictum arcu. Proin turpis dolor, suscipit molestie blandit tincidunt, luctus ac urna. Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Suspendisse potenti. Sed lobortis faucibus euismod. Cras luctus dui sit amet dictum vestibulum. Suspendisse euismod, ex a efficitur tempus, leo felis imperdiet felis, a auctor ante nisl ultrices urna. Suspendisse potenti. Curabitur mauris felis, consequat vitae ex non, tempor luctus nunc. Duis eu lorem eget magna posuere condimentum ut eu nisi. Nulla ornare nulla ligula, sit amet porta velit euismod id. Sed eu justo id neque tristique lobortis. Nulla vel dictum enim. Maecenas mollis, lacus id tincidunt ullamcorper, lorem arcu semper arcu, at hendrerit ligula diam vitae nisl. Vestibulum sollicitudin, augue eu convallis pulvinar, est metus consequat purus, ac pretium ante lorem id massa. Cras id magna congue, ornare tellus ac, lobortis augue.
              Etiam dignissim ante eget turpis laoreet, et varius ante iaculis. Aenean et tellus lacus. Praesent nec tincidunt quam, vitae accumsan metus. Praesent sollicitudin commodo massa, et venenatis libero efficitur eu. Quisque sem mi, fermentum a mattis id, varius ut lectus. Proin egestas diam non quam rutrum, sed volutpat lectus dapibus. Duis consequat imperdiet urna, sit amet dignissim sem tincidunt at. Donec efficitur pretium neque, sit amet porta arcu imperdiet id. Duis urna nisl, scelerisque vitae eros in, auctor hendrerit risus. Donec luctus, arcu cursus mollis condimentum, sapien urna volutpat leo, vel egestas elit est ac elit.
              Cras vitae augue id eros condimentum luctus at eleifend urna. Nulla aliquam ante elit, eget egestas orci faucibus quis. Integer vitae suscipit lorem. Duis rhoncus consectetur iaculis. Quisque tellus ante, volutpat non tempor sed, iaculis et purus. Donec pulvinar turpis quis lorem rutrum, a feugiat nibh facilisis. Aliquam erat.
            </p>
          </main>
        </body>
      </html>
    `);

    const results = hasJustifiedText();
    console.log(results);
    expect(results).toHaveLength(1);
  });

  it("ignores non-justified text", () => {
    setupDOM(`
      <html>
        <body>
          <main>
            <p style="text-align: center;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies nisi nunc, vel iaculis magna lobortis et. Nunc urna dui, dictum vel tellus sed, fringilla lobortis velit. Pellentesque venenatis mollis dolor eget cursus. Curabitur sodales mollis purus, quis molestie nulla commodo a. Maecenas et lacinia risus. Donec sodales, ipsum a gravida porttitor, metus purus luctus augue, eu pellentesque justo tellus non dolor. Mauris rutrum dui augue, vel dictum lacus lobortis id.
              Fusce interdum nisi at sapien rhoncus consectetur. Duis nec sem et tellus cursus sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet quam sit amet urna tempus ultricies. Quisque et tincidunt quam, vel viverra ante. Cras sed pretium velit, eu vulputate ligula. Donec eleifend felis vel urna pellentesque, ac lacinia diam luctus. Mauris commodo dui vehicula hendrerit efficitur. Aliquam arcu ex, ultricies vitae pretium at, eleifend vitae nisl. Donec efficitur egestas erat id molestie. Ut congue luctus ultricies. Aenean suscipit volutpat orci, ut accumsan mauris.
              Aliquam id ex auctor, scelerisque purus ut, pellentesque metus. Morbi interdum feugiat ex, a interdum nisi ultricies ut. Quisque at dignissim purus, vitae sollicitudin turpis. Curabitur pretium at dui et aliquet. Donec fringilla nulla nec justo vulputate volutpat. Ut iaculis lacus in placerat facilisis. Cras mi nunc, volutpat id condimentum interdum, sodales sit amet felis. Integer iaculis magna id libero tristique volutpat. Donec ut dictum arcu. Proin turpis dolor, suscipit molestie blandit tincidunt, luctus ac urna. Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Suspendisse potenti. Sed lobortis faucibus euismod. Cras luctus dui sit amet dictum vestibulum. Suspendisse euismod, ex a efficitur tempus, leo felis imperdiet felis, a auctor ante nisl ultrices urna. Suspendisse potenti. Curabitur mauris felis, consequat vitae ex non, tempor luctus nunc. Duis eu lorem eget magna posuere condimentum ut eu nisi. Nulla ornare nulla ligula, sit amet porta velit euismod id. Sed eu justo id neque tristique lobortis. Nulla vel dictum enim. Maecenas mollis, lacus id tincidunt ullamcorper, lorem arcu semper arcu, at hendrerit ligula diam vitae nisl. Vestibulum sollicitudin, augue eu convallis pulvinar, est metus consequat purus, ac pretium ante lorem id massa. Cras id magna congue, ornare tellus ac, lobortis augue.
              Etiam dignissim ante eget turpis laoreet, et varius ante iaculis. Aenean et tellus lacus. Praesent nec tincidunt quam, vitae accumsan metus. Praesent sollicitudin commodo massa, et venenatis libero efficitur eu. Quisque sem mi, fermentum a mattis id, varius ut lectus. Proin egestas diam non quam rutrum, sed volutpat lectus dapibus. Duis consequat imperdiet urna, sit amet dignissim sem tincidunt at. Donec efficitur pretium neque, sit amet porta arcu imperdiet id. Duis urna nisl, scelerisque vitae eros in, auctor hendrerit risus. Donec luctus, arcu cursus mollis condimentum, sapien urna volutpat leo, vel egestas elit est ac elit.
              Cras vitae augue id eros condimentum luctus at eleifend urna. Nulla aliquam ante elit, eget egestas orci faucibus quis. Integer vitae suscipit lorem. Duis rhoncus consectetur iaculis. Quisque tellus ante, volutpat non tempor sed, iaculis et purus. Donec pulvinar turpis quis lorem rutrum, a feugiat nibh facilisis. Aliquam erat.
            </p>
          </main>
        </body>
      </html>
    `);

    const results = hasJustifiedText();
    expect(results).toHaveLength(0);
  });

  it("ignores invisible elements", () => {
    setupDOM(`
      <html>
        <body>
          <main id="main">
            <p style="text-align: justify; display: none;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies nisi nunc, vel iaculis magna lobortis et. Nunc urna dui, dictum vel tellus sed, fringilla lobortis velit. Pellentesque venenatis mollis dolor eget cursus. Curabitur sodales mollis purus, quis molestie nulla commodo a. Maecenas et lacinia risus. Donec sodales, ipsum a gravida porttitor, metus purus luctus augue, eu pellentesque justo tellus non dolor. Mauris rutrum dui augue, vel dictum lacus lobortis id.
              Fusce interdum nisi at sapien rhoncus consectetur. Duis nec sem et tellus cursus sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet quam sit amet urna tempus ultricies. Quisque et tincidunt quam, vel viverra ante. Cras sed pretium velit, eu vulputate ligula. Donec eleifend felis vel urna pellentesque, ac lacinia diam luctus. Mauris commodo dui vehicula hendrerit efficitur. Aliquam arcu ex, ultricies vitae pretium at, eleifend vitae nisl. Donec efficitur egestas erat id molestie. Ut congue luctus ultricies. Aenean suscipit volutpat orci, ut accumsan mauris.
              Aliquam id ex auctor, scelerisque purus ut, pellentesque metus. Morbi interdum feugiat ex, a interdum nisi ultricies ut. Quisque at dignissim purus, vitae sollicitudin turpis. Curabitur pretium at dui et aliquet. Donec fringilla nulla nec justo vulputate volutpat. Ut iaculis lacus in placerat facilisis. Cras mi nunc, volutpat id condimentum interdum, sodales sit amet felis. Integer iaculis magna id libero tristique volutpat. Donec ut dictum arcu. Proin turpis dolor, suscipit molestie blandit tincidunt, luctus ac urna. Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Suspendisse potenti. Sed lobortis faucibus euismod. Cras luctus dui sit amet dictum vestibulum. Suspendisse euismod, ex a efficitur tempus, leo felis imperdiet felis, a auctor ante nisl ultrices urna. Suspendisse potenti. Curabitur mauris felis, consequat vitae ex non, tempor luctus nunc. Duis eu lorem eget magna posuere condimentum ut eu nisi. Nulla ornare nulla ligula, sit amet porta velit euismod id. Sed eu justo id neque tristique lobortis. Nulla vel dictum enim. Maecenas mollis, lacus id tincidunt ullamcorper, lorem arcu semper arcu, at hendrerit ligula diam vitae nisl. Vestibulum sollicitudin, augue eu convallis pulvinar, est metus consequat purus, ac pretium ante lorem id massa. Cras id magna congue, ornare tellus ac, lobortis augue.
              Etiam dignissim ante eget turpis laoreet, et varius ante iaculis. Aenean et tellus lacus. Praesent nec tincidunt quam, vitae accumsan metus. Praesent sollicitudin commodo massa, et venenatis libero efficitur eu. Quisque sem mi, fermentum a mattis id, varius ut lectus. Proin egestas diam non quam rutrum, sed volutpat lectus dapibus. Duis consequat imperdiet urna, sit amet dignissim sem tincidunt at. Donec efficitur pretium neque, sit amet porta arcu imperdiet id. Duis urna nisl, scelerisque vitae eros in, auctor hendrerit risus. Donec luctus, arcu cursus mollis condimentum, sapien urna volutpat leo, vel egestas elit est ac elit.
              Cras vitae augue id eros condimentum luctus at eleifend urna. Nulla aliquam ante elit, eget egestas orci faucibus quis. Integer vitae suscipit lorem. Duis rhoncus consectetur iaculis. Quisque tellus ante, volutpat non tempor sed, iaculis et purus. Donec pulvinar turpis quis lorem rutrum, a feugiat nibh facilisis. Aliquam erat.
            </p>
          </main>
        </body>
      </html>
    `);

    const results = hasJustifiedText();
    expect(results).toHaveLength(0);
  });
});
