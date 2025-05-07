import { hasFrameUniqueTitlesEval } from "./frame-unique-title/frame-unique-title.js";
import { hasVideoCaptionsEval } from "./has-video-captions/has-video-captions.js";
import { hasEmptyIframeTitles } from "./iframe-titles/iframe-titles.js";
import { objectHasAltText } from "./object-has-alt-text/object-has-alt-text.js";
import { videOrAudioHasAutoplay } from "./video-audio-no-autoplay/video-audio-no-autoplay.js";

export async function embeddedElementsAudit(auditResults) {
    await hasEmptyIframeTitles(auditResults);
    await objectHasAltText(auditResults);
    await hasFrameUniqueTitlesEval(auditResults);
    await videOrAudioHasAutoplay(auditResults);
    await hasVideoCaptionsEval(auditResults);
}