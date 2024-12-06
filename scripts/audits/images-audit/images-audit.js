import { hasButtonImages } from "./button-images/button-images.js";
import { hasImageMaps } from "./image-maps/image-maps.js";
import { hasLinkedImages } from "./linked-images/linked-images.js";
import { hasMissingAltImages } from "./missing-alt-images/missing-alt-images.js";
import { hasRoleImg } from "./role-img/role-img.js";
import { hasServerSideImgMaps } from "./server-side-img-maps/server-side-img-maps.js";

export async function imagesAudit(auditResults) {
    await hasMissingAltImages(auditResults);
    await hasLinkedImages(auditResults);
    await hasButtonImages(auditResults);
    await hasImageMaps(auditResults);
    await hasRoleImg(auditResults);
    await hasServerSideImgMaps(auditResults);
}