import { hasButtonImagesEval } from "./has-button-images/has-button-images.js";
import { hasImageMapsEval } from "./has-image-maps/has-image-maps.js";
import { hasRedundantImgAltEval } from "./has-image-redundant-alt/has-image-redundant-alt.js";
import { hasLinkedImagesEval } from "./has-linked-images/has-linked-images.js";
import { hasMissingAltImagesEval } from "./has-missing-alt-images/has-missing-alt-images.js";
import { hasRoleImgEval } from "./has-role-img/has-role-img.js";
import { hasServerSideImgMapsEval } from "./has-server-side-img-maps/has-server-side-img-maps.js";
import { hasSvgRoleImgMissingAltEval } from "./has-svg-role-img-missing-alt/has-svg-role-img-missing-alt.js";

export async function imagesAudit(auditResults) {
  await hasMissingAltImagesEval(auditResults);
  await hasRoleImgEval(auditResults);
  await hasSvgRoleImgMissingAltEval(auditResults);
  await hasRedundantImgAltEval(auditResults);
  await hasLinkedImagesEval(auditResults);
  await hasButtonImagesEval(auditResults);
  await hasImageMapsEval(auditResults);
  await hasServerSideImgMapsEval(auditResults);
}
