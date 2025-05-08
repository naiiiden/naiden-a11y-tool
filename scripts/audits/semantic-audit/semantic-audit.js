import { hasAsideInOtherLandmarksEval } from "./has-aside-in-other-landmarks/has-aside-in-other-landmarks.js";
import { hasBannersInOtherLandmarksEval } from "./has-banners-in-other-landmarks/has-banners-in-other-landmarks.js";
import { hasBypassEval } from "./has-bypass/has-bypass.js";
import { hasContentOutsideLandmarksEval } from "./has-content-outside-landmarks/has-content-outside-landmarks.js";
import { hasContentinfoInOtherLandmarksEval } from "./has-contentinfo-in-other-landmarks/has-contentinfo-in-other-landmarks.js";
import { hasDuplicateIdsEval } from "./has-duplicate-ids/has-duplicate-ids.js";
import { hasHeadingLevelOneEval } from "./has-heading-level-one/has-heading-level-one.js";
import { hasHeadingsEval } from "./has-headings/has-headings.js";
import { hasInvalidDlElementsEval } from "./has-invalid-dl-elements/has-invalid-dl-elements.js";
import { hasInvalidDtDdElementsEval } from "./has-invalid-dt-dd-elements/has-invalid-dt-dd-elements.js";
import { hasInvalidListContentEval } from "./has-invalid-list-content/has-invalid-list-content.js";
import { hasLiOutsideListEval } from "./has-li-outside-list/has-li-outside-list.js";
import { hasMainInOtherLandmarksEval } from "./has-main-in-other-landmarks/has-main-in-other-landmarks.js";
import { hasMoreThanOneBannerLandmarkEval } from "./has-more-than-one-banner-landmark/has-more-thank-one-banner-landmark.js";
import { hasMoreThanOneContentinfoLandmarkEval } from "./has-more-than-one-contentinfo-landmark/has-more-than-one-contentinfo-landmark.js";
import { hasNoMainLandmarkOrMoreEval } from "./has-no-main-landmark-or-more/has-no-main-landmark-or-more.js";
import { hasRegionsOrLandmarksEval } from "./has-regions-or-landmarks/has-regions-or-landmarks.js";
import { hasTabindexGreaterThanZeroEval } from "./has-tabindex-greater-than-zero/has-tabindex-greater-than-zero.js";
import { hasHeadingLevels } from "./heading-levels/heading-levels.js";
import { hasUniqueLandmarks } from "./landmarks-unique/landmarks-unique.js";
import { hasPossibleHeadings } from "./possible-headings/possible-headings.js";

export async function semanticAudit(auditResults) {
    await hasHeadingLevelOneEval(auditResults);
    await hasHeadingLevels(auditResults);
    await hasPossibleHeadings(auditResults);
    await hasHeadingsEval(auditResults);

    await hasRegionsOrLandmarksEval(auditResults);
    await hasNoMainLandmarkOrMoreEval(auditResults);
    await hasMoreThanOneBannerLandmarkEval(auditResults);
    await hasMoreThanOneContentinfoLandmarkEval(auditResults);
    await hasBannersInOtherLandmarksEval(auditResults);
    await hasAsideInOtherLandmarksEval(auditResults);
    await hasContentinfoInOtherLandmarksEval(auditResults);
    await hasMainInOtherLandmarksEval(auditResults);
    await hasContentOutsideLandmarksEval(auditResults);
    await hasUniqueLandmarks(auditResults);
    
    await hasInvalidListContentEval(auditResults);
    await hasLiOutsideListEval(auditResults);
    await hasInvalidDlElementsEval(auditResults);
    await hasInvalidDtDdElementsEval(auditResults);

    await hasBypassEval(auditResults);
    await hasDuplicateIdsEval(auditResults);
    await hasTabindexGreaterThanZeroEval(auditResults);
}