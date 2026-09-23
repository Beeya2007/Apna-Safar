/* ============================================================
   SKELETON REGION — the part of the screen that is loading
   ------------------------------------------------------------
   Wrap any group of placeholders in this. It does two things a
   grey box cannot do on its own:

     - tells assistive technology the region is busy, and says
       "Loading" out loud once, instead of announcing twenty
       nameless boxes;
     - carries the settings for everything inside it, so the ink
       speed or colour is set in one place per screen.

     <SkeletonRegion label="Loading your trips">
       <SkeletonCard />
     </SkeletonRegion>
   ============================================================ */

import type { CSSProperties, ReactNode } from "react";

interface SkeletonRegionProps {
  children: ReactNode;
  /** What is loading. Said out loud; never shown. */
  label?: string;
  className?: string;
  /** Settings for everything inside — ink duration, colour, strength. */
  style?: CSSProperties;
}

export default function SkeletonRegion({
  children,
  label = "Loading",
  className = "",
  style,
}: SkeletonRegionProps) {
  return (
    <div role="status" aria-busy="true" className={className} style={style}>
      <span className="skeleton-label">{label}</span>
      {children}
    </div>
  );
}
