/* ============================================================
   SKELETON TABLE — a list of rows that has not arrived yet
   ------------------------------------------------------------
   Avatar, name, one fact, one more fact. The shape of the
   bookings and messages lists.
   ============================================================ */

import Skeleton from "./Skeleton";

interface SkeletonTableProps {
  /** How many rows to draw. */
  rows?: number;
  /** Where this table sits in the queue of blocks on screen. */
  index?: number;
}

export default function SkeletonTable({ rows = 5, index = 0 }: SkeletonTableProps) {
  return (
    <div className="skeleton-table">
      {Array.from({ length: rows }, (_, row) => (
        <div className="skeleton-table__row" key={row}>
          <Skeleton shape="circle" index={index + row} />
          <Skeleton shape="line" index={index + row} />
          <Skeleton shape="line" width="70%" index={index + row + 1} />
          <Skeleton shape="line" width="50%" index={index + row + 2} />
        </div>
      ))}
    </div>
  );
}
