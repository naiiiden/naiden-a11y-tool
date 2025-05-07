import { hasButtonImagesEval } from "./button-images/button-images.js";
import { hasImageMapsEval } from "./image-maps/image-maps.js";
import { hasRedundantImgAltEval } from "./image-redundant-alt/image-redundant-alt.js";
import { hasLinkedImagesEval } from "./linked-images/linked-images.js";
import { hasMissingAltImagesEval } from "./missing-alt-images/missing-alt-images.js";
import { hasRoleImgEval } from "./role-img/role-img.js";
import { hasServerSideImgMapsEval } from "./server-side-img-maps/server-side-img-maps.js";
import { hasSvgRoleImgMissingAltEval } from "./svg-role-img-missing-alt/svg-role-img-missing-alt.js";

export async function imagesAudit(auditResults) {
    await hasMissingAltImagesEval(auditResults);
    await hasLinkedImagesEval(auditResults);
    await hasButtonImagesEval(auditResults);
    await hasImageMapsEval(auditResults);
    await hasRoleImgEval(auditResults);
    await hasServerSideImgMapsEval(auditResults);
    await hasSvgRoleImgMissingAltEval(auditResults);
    await hasRedundantImgAltEval(auditResults);
}