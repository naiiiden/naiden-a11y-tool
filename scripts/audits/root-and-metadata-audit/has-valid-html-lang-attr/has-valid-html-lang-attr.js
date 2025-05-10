import { rootAndMetadataErrors } from "../../../errors/root-and-metadata.js";
import { getUniqueSelector } from "../../../utils/get-unique-selector.js";
import { inspectedWindowEval } from "../../../utils/inspected-window-eval.js";

// prettier-ignore
export const validLangValues = [
  "ab", "aa", "af", "ak", "sq", "am", "ar", "an", "hy", "as", "av", "ae", "ay", "az", "bm", "ba", "eu", "be", "bn",
  "bi", "bs", "br", "bg", "my", "ca", "ch", "ce", "zh", "cu", "cv", "kw", "co", "cr", "cs", "da", "dv", "nl", "dz",
  "en", "eo", "et", "ee", "fo", "fj", "fi", "fr", "fy", "ff", "gd", "gl", "lg", "ka", "de", "ki", "el", "kl", "gn",
  "gu", "ht", "ha", "he", "hz", "hi", "ho", "hr", "hu", "ig", "is", "io", "ii", "iu", "ie", "ia", "id", "ik", "it",
  "jv", "ja", "kn", "kr", "ks", "kk", "km", "ki", "rw", "ky", "kv", "kg", "ko", "kj", "ku", "lo", "la", "lv", "li",
  "ln", "lt", "lb", "lu", "mk", "mg", "ms", "ml", "mt", "gv", "mi", "mr", "mh", "mn", "na", "nv", "nd", "ne", "ng",
  "nb", "nn", "no", "ii", "nr", "oc", "oj", "or", "om", "os", "pa", "pi", "fa", "pl", "pt", "ps", "qu", "rm", "ro",
  "rn", "ru", "se", "sm", "sg", "sa", "sc", "sr", "sn", "sd", "si", "sk", "sl", "so", "st", "es", "su", "sw", "ss",
  "sv", "ta", "te", "tg", "th", "ti", "bo", "tk", "tl", "tn", "to", "tr", "ts", "tt", "tw", "ty", "ug", "uk", "ur",
  "uz", "ve", "vi", "vo", "wa", "cy", "wo", "xh", "yi", "yo", "za", "zu"
];

export function hasValidHtmlLangAttr() {
  const rootDocument = document.documentElement;
  const hasLangAttr = rootDocument.getAttribute("lang");

  return {
    hasLangAttr,
    outerHTML: rootDocument.cloneNode().outerHTML,
    selector: getUniqueSelector(rootDocument),
  };
}

export async function hasValidHtmlLangAttrEval(auditResults) {
  const rootDocument = await inspectedWindowEval(`
    const getUniqueSelector = ${getUniqueSelector.toString()};
    const hasValidHtmlLangAttr = ${hasValidHtmlLangAttr.toString()};

    return hasValidHtmlLangAttr();
  `);

  if (
    rootDocument.hasLangAttr &&
    !validLangValues.includes(rootDocument.hasLangAttr.split("-")[0])
  ) {
    auditResults.push({
      ...rootAndMetadataErrors[1],
      element: rootDocument.outerHTML,
      selector: rootDocument.selector,
    });
  }
}
