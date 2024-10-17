import { htmlAndHeadErrors } from "./errors.js";

export async function htmlAndHeadAudit(auditResults) {
    const htmlLanguage = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval("document.documentElement.getAttribute('lang')", resolve);
    });
  
    const validLangValues = [
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

    if (!htmlLanguage || !validLangValues.includes(htmlLanguage.split('-')[0])) {
        auditResults.push(htmlAndHeadErrors[0]);
    }

    const pageTitle = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval("document.title", resolve);
    });
    
    if (!pageTitle || pageTitle === "") {
        auditResults.push(htmlAndHeadErrors[1]);
    }

    const metaRefresh = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval(`document.querySelector('meta[http-equiv="refresh"]')`, resolve);
    })

    if ((metaRefresh && metaRefresh.content) || (metaRefresh && metaRefresh.content !== "")) {
        auditResults.push(htmlAndHeadErrors[2]);
    }

    const metaViewport = await new Promise((resolve) => {
        chrome.devtools.inspectedWindow.eval("document.querySelector('meta[name=\"viewport\"]')?.getAttribute('content')", resolve);
    })

    if (metaViewport && (metaViewport.includes('user-scalable=no') || metaViewport.includes('user-scalable=0'))) {
        auditResults.push(htmlAndHeadErrors[3]);
    }
}