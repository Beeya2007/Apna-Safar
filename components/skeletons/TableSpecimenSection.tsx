/* ============================================================
   TABLE SPECIMEN — a list of rows, loading
   ============================================================ */

import SkeletonTable from "@/components/shared/SkeletonTable";
import SkeletonRegion from "@/components/shared/SkeletonRegion";

export default function TableSpecimenSection() {
  return (
    <section className="specimen">
      <h2 className="specimen__title">Table</h2>
      <p className="specimen__note">
        A long thin block spreads sideways, because the drop is sized against
        the shape it is in rather than always being a circle.
      </p>
      <SkeletonRegion label="Loading bookings" className="specimen__stage">
        <SkeletonTable rows={5} />
      </SkeletonRegion>
    </section>
  );
}
