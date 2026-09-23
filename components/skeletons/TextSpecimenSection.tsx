/* ============================================================
   TEXT SPECIMEN — a heading and three lines, loading
   ============================================================ */

import Skeleton from "@/components/shared/Skeleton";
import SkeletonText from "@/components/shared/SkeletonText";
import SkeletonRegion from "@/components/shared/SkeletonRegion";

export default function TextSpecimenSection() {
  return (
    <section className="specimen">
      <h2 className="specimen__title">Text</h2>
      <p className="specimen__note">
        One drop per line. They land 60ms apart, so the paragraph reads top to
        bottom instead of flashing all at once.
      </p>
      <SkeletonRegion label="Loading the description" className="specimen__stage">
        <Skeleton shape="heading" index={0} />
        <SkeletonText lines={3} index={1} />
      </SkeletonRegion>
    </section>
  );
}
