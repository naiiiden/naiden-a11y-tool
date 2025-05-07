import { hasButtonImagesEval } from "./button-images/button-images.js";
import { hasImageMaps } from "./image-maps/image-maps.js";
import { hasRedundantImgAlt } from "./image-redundant-alt/image-redundant-alt.js";
import { hasLinkedImages } from "./linked-images/linked-images.js";
import { hasMissingAltImages } from "./missing-alt-images/missing-alt-images.js";
import { hasRoleImg } from "./role-img/role-img.js";
import { hasServerSideImgMaps } from "./server-side-img-maps/server-side-img-maps.js";
import { hasSvgRoleImgMissingAlt } from "./svg-role-img-missing-alt/svg-role-img-missing-alt.js";

export async function imagesAudit(auditResults) {
    await hasMissingAltImages(auditResults);
    await hasLinkedImages(auditResults);
    await hasButtonImagesEval(auditResults);
    await hasImageMaps(auditResults);
    await hasRoleImg(auditResults);
    await hasServerSideImgMaps(auditResults);
    await hasSvgRoleImgMissingAlt(auditResults);
    await hasRedundantImgAlt(auditResults);
}