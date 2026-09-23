/* ============================================================
   SKELETON PAGE  —  shown at  /skeletons
   ------------------------------------------------------------
   The working reference for the loading state: every placeholder
   shape, with controls for the ink above them.

   This file is deliberately just a list of sections, top to
   bottom. Each section's code lives in components/skeletons/.

   Styles: styles/pages/skeletons.css
   ============================================================ */

import InkLab from "@/components/skeletons/InkLab";
import TextSpecimenSection from "@/components/skeletons/TextSpecimenSection";
import CardSpecimenSection from "@/components/skeletons/CardSpecimenSection";
import TableSpecimenSection from "@/components/skeletons/TableSpecimenSection";
import DashboardSpecimenSection from "@/components/skeletons/DashboardSpecimenSection";

export default function SkeletonsPage() {
  return (
    <div className="container section-band">
      <h1 className="specimen__heading">Loading states</h1>
      <p className="specimen__lede">
        A drop of ink lands in each placeholder and spreads until it reaches the
        edges, then fades and lands again. Nothing sweeps across the screen and
        nothing spins.
      </p>

      {/* CONTROLS wrap everything below them — the settings are
          plain custom properties, inherited by every section. */}
      <InkLab>
        {/* 1. TEXT — a heading and three lines */}
        <TextSpecimenSection />

        {/* 2. CARDS — three listing cards */}
        <CardSpecimenSection />

        {/* 3. TABLE — a list of rows */}
        <TableSpecimenSection />

        {/* 4. DASHBOARD — the whole screen at once */}
        <DashboardSpecimenSection />
      </InkLab>
    </div>
  );
}
