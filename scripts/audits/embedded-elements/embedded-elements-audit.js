import { hasFrameUniqueTitlesEval } from "./frame-unique-title/frame-unique-title.js";
import { hasVideoCaptionsEval } from "./has-video-captions/has-video-captions.js";
import { hasEmptyIframeTitlesEval } from "./iframe-titles/iframe-titles.js";
import { hasObjectAltTextEval } from "./object-has-alt-text/object-has-alt-text.js";
import { hasVideOrAudioAutoplayEval } from "./video-audio-no-autoplay/video-audio-no-autoplay.js";

export async function embeddedElementsAudit(auditResults) {
  await hasEmptyIframeTitlesEval(auditResults);
  await hasFrameUniqueTitlesEval(auditResults);
  await hasVideOrAudioAutoplayEval(auditResults);
  await hasVideoCaptionsEval(auditResults);
  await hasObjectAltTextEval(auditResults);
}
