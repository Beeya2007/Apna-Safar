/* ============================================================
   CARD SPECIMEN — three listing cards, loading
   ============================================================ */

import SkeletonCard from "@/components/shared/SkeletonCard";
import SkeletonRegion from "@/components/shared/SkeletonRegion";

export default function CardSpecimenSection() {
  return (
    <section className="specimen">
      <h2 className="specimen__title">Cards</h2>
      <p className="specimen__note">
        Each block spreads at its own pace and none of them are round — the
        filter pushes every edge around with a different piece of noise.
      </p>
      <SkeletonRegion label="Loading stays" className="specimen__stage specimen__stage--cards">
        <SkeletonCard index={0} />
        <SkeletonCard index={3} />
        <SkeletonCard index={6} />
      </SkeletonRegion>
    </section>
  );
}
