import { hasAsideInOtherLandmarksEval } from "./has-aside-in-other-landmarks/has-aside-in-other-landmarks.js";
import { hasBannersInOtherLandmarksEval } from "./has-banners-in-other-landmarks/has-banners-in-other-landmarks.js";
import { hasBypassEval } from "./has-bypass/has-bypass.js";
import { hasContentOutsideLandmarks } from "./has-content-outside-landmarks/has-content-outside-landmarks.js";
import { hasContentinfoInOtherLandmarks } from "./has-contentinfo-in-other-landmarks/has-contentinfo-in-other-landmarks.js";
import { hasDuplicateIds } from "./has-duplicate-ids/has-duplicate-ids.js";
import { hasHeadingLevelOne } from "./has-heading-level-one/has-heading-level-one.js";
import { hasHeadings } from "./has-headings/has-headings.js";
import { hasInvalidDlElements } from "./has-invalid-dl-elements/has-invalid-dl-elements.js";
import { hasInvalidDtDdElements } from "./has-invalid-dt-dd-elements/has-invalid-dt-dd-elements.js";
import { hasInvalidListContent } from "./has-invalid-list-content/has-invalid-list-content.js";
import { hasLiOutsideList } from "./has-li-outside-list/has-li-outside-list.js";
import { hasMainInOtherLandmarks } from "./has-main-in-other-landmarks/has-main-in-other-landmarks.js";
import { hasMoreThanOneBannerLandmark } from "./has-more-than-one-banner-landmark/has-more-thank-one-banner-landmark.js";
import { hasMoreThanOneContentinfoLandmark } from "./has-more-than-one-contentinfo-landmark/has-more-than-one-contentinfo-landmark.js";
import { hasNoMainLandmarkOrMore } from "./has-no-main-landmark-or-more/has-no-main-landmark-or-more.js";
import { hasRegionsOrLandmarks } from "./has-regions-or-landmarks/has-regions-or-landmarks.js";
import { hasTabindexGreaterThanZero } from "./has-tabindex-greater-than-zero/has-tabindex-greater-than-zero.js";
import { hasHeadingLevels } from "./heading-levels/heading-levels.js";
import { hasUniqueLandmarks } from "./landmarks-unique/landmarks-unique.js";
import { hasPossibleHeadings } from "./possible-headings/possible-headings.js";

export async function semanticAudit(auditResults) {
    await hasHeadingLevelOne(auditResults);
    await hasHeadingLevels(auditResults);
    await hasPossibleHeadings(auditResults);
    await hasHeadings(auditResults);

    await hasRegionsOrLandmarks(auditResults);
    await hasNoMainLandmarkOrMore(auditResults);
    await hasMoreThanOneBannerLandmark(auditResults);
    await hasMoreThanOneContentinfoLandmark(auditResults);
    await hasBannersInOtherLandmarksEval(auditResults);
    await hasAsideInOtherLandmarksEval(auditResults);
    await hasContentinfoInOtherLandmarks(auditResults);
    await hasMainInOtherLandmarks(auditResults);
    await hasContentOutsideLandmarks(auditResults);
    await hasUniqueLandmarks(auditResults);
    
    await hasInvalidListContent(auditResults);
    await hasLiOutsideList(auditResults);
    await hasInvalidDlElements(auditResults);
    await hasInvalidDtDdElements(auditResults);

    await hasBypassEval(auditResults);
    await hasDuplicateIds(auditResults);
    await hasTabindexGreaterThanZero(auditResults);
}