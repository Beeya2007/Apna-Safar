/* ============================================================
   SKELETON TEXT — a paragraph that has not arrived yet
   ------------------------------------------------------------
   A stack of placeholder lines, the last one short the way a
   real paragraph ends.

     <SkeletonText lines={3} />
   ============================================================ */

import Skeleton from "./Skeleton";

interface SkeletonTextProps {
  /** How many lines to draw. Three reads as a paragraph. */
  lines?: number;
  /** Where this paragraph sits in the queue of blocks on screen. */
  index?: number;
  className?: string;
}

export default function SkeletonText({
  lines = 3,
  index = 0,
  className = "",
}: SkeletonTextProps) {
  return (
    <div className={`skeleton-text ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} shape="line" index={index + i} className="skeleton-text__line" />
      ))}
    </div>
  );
}
