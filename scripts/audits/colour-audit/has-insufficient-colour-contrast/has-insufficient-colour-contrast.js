import { colourErrors } from "../../../errors/colour.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";
import { isElementVisible } from "../../../utils/is-element-visible.js";

export function hasInsufficientColourContrast() {
  function getRGB(color) {
    if (color.startsWith("rgb")) {
      const [r, g, b] = color.match(/\d+/g).map(Number);
      return [r, g, b];
    }
    if (color.startsWith("#")) {
      const hex = color.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return [r, g, b];
    }
    return color.match(/\\d+/g).map(Number);
  }

  function getLuminance(r, g, b) {
    let [sR, sG, sB] = [r, g, b].map((val) => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * sR + 0.7152 * sG + 0.0722 * sB;
  }

  function getContrastRatio(l1, l2) {
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  function isLargeText(element) {
    const style = window.getComputedStyle(element);
    const fontSize = parseFloat(style.fontSize);
    const fontWeight = style.fontWeight;

    const fontSizePt = fontSize / 1.333;

    return fontSizePt >= 18 || (fontSizePt >= 14 && fontWeight >= 700);
  }

  function isTransparent(color) {
    return color === "transparent" || color === "rgba(0, 0, 0, 0)";
  }

  function getBackgroundColor(element) {
    let currentElement = element;
    let backgrounds = [];

    while (currentElement && currentElement !== document) {
      const style = window.getComputedStyle(currentElement);
      const backgroundColor = style.backgroundColor;

      if (!isTransparent(backgroundColor)) {
        backgrounds.push(backgroundColor);
      }

      currentElement = currentElement.parentElement;
    }

    if (backgrounds.length > 0) {
      return backgrounds[0];
    }

    const bodyBg = window.getComputedStyle(document.body).backgroundColor;
    const htmlBg = window.getComputedStyle(document.documentElement).backgroundColor;

    if (!isTransparent(bodyBg)) {
      return bodyBg;
    }

    if (!isTransparent(htmlBg)) {
      return htmlBg;
    }

    return "rgb(255, 255, 255)";
  }

  const textElements = Array.from(
    document.querySelectorAll("*:not(script, style)"),
  ).filter((element) => {
    const hasText = element.textContent.trim().length > 0;
    const hasDirectText = Array.from(element.childNodes).some(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0,
    );
    return hasText && hasDirectText && isElementVisible(element);
  });

  return textElements
    .map((element) => {
      const style = window.getComputedStyle(element);
      const foregroundColor = style.color;
      const backgroundColor = getBackgroundColor(element);

      const [fR, fG, fB] = getRGB(foregroundColor);
      const [bR, bG, bB] = getRGB(backgroundColor);

      const foregroundLuminance = getLuminance(fR, fG, fB);
      const backgroundLuminance = getLuminance(bR, bG, bB);

      const contrastRatio = getContrastRatio(foregroundLuminance, backgroundLuminance);
      const requiredRatio = isLargeText(element) ? 3 : 4.5;

      const hasInsufficientContrast = contrastRatio < requiredRatio;

      return {
        outerHTML: element.outerHTML,
        selector: getUniqueSelector(element),
        contrastRatio: contrastRatio.toFixed(2),
        requiredRatio,
        foregroundColor,
        backgroundColor,
        hasInsufficientContrast,
        isLargeText: isLargeText(element),
      };
    })
    .filter((item) => item.hasInsufficientContrast);
}

export async function hasInsufficientColourContrastEval(auditResults) {
  const insufficientColourContrast = await inspectedWindowEval(`
        const getUniqueSelector = ${getUniqueSelector.toString()};
        const isElementVisible = ${isElementVisible.toString()};
        const hasInsufficientColourContrast = ${hasInsufficientColourContrast.toString()};

        return hasInsufficientColourContrast();
    `);

  console.log(insufficientColourContrast);

  insufficientColourContrast.forEach((element) => {
    auditResults.push({
      ...colourErrors[0],
      element: element.outerHTML,
      selector: element.selector,
      contrastRatio: element.contrastRatio,
      requiredRatio: element.requiredRatio,
      foregroundColor: element.foregroundColor,
      backgroundColor: element.backgroundColor,
      hasInsufficientContrast: element.hasInsufficientContrast,
    });
  });
}
