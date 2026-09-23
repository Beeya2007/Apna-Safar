/* ============================================================
   DASHBOARD SPECIMEN — a whole screen, loading
   ------------------------------------------------------------
   Header, avatar, heading, description, four stat panels, a
   chart well and a list. The full thing, to check the effect
   still reads as calm at this many blocks.
   ============================================================ */

import Skeleton from "@/components/shared/Skeleton";
import SkeletonText from "@/components/shared/SkeletonText";
import SkeletonTable from "@/components/shared/SkeletonTable";
import SkeletonRegion from "@/components/shared/SkeletonRegion";

export default function DashboardSpecimenSection() {
  return (
    <section className="specimen">
      <h2 className="specimen__title">Full dashboard</h2>
      <SkeletonRegion label="Loading your dashboard" className="dash">
        {/* HEADER — logo strip and two buttons */}
        <div className="dash__header">
          <Skeleton shape="line" width="140px" index={0} />
          <div className="dash__actions">
            <Skeleton shape="button" width="var(--space-20)" index={1} />
            <Skeleton shape="button" index={2} />
          </div>
        </div>

        {/* IDENTITY — avatar, name, a couple of lines */}
        <div className="dash__identity">
          <Skeleton shape="circle" index={3} />
          <div className="dash__identity-text">
            <Skeleton shape="heading" width="40%" index={4} />
            <SkeletonText lines={2} index={5} />
          </div>
        </div>

        {/* STATS — four panels */}
        <div className="dash__stats">
          {[0, 1, 2, 3].map((n) => (
            <Skeleton key={n} shape="block" index={7 + n} />
          ))}
        </div>

        {/* CHART — the big well */}
        <Skeleton shape="block" height="var(--space-32)" index={11} />

        {/* LIST — recent bookings */}
        <SkeletonTable rows={4} index={12} />
      </SkeletonRegion>
    </section>
  );
}
