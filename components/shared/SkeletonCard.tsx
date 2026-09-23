/* ============================================================
   SKELETON CARD — a listing card that has not arrived yet
   ------------------------------------------------------------
   The same shape as <ListingCard />: photo on top, a title, two
   lines of description, a price and a rating along the bottom.
   ============================================================ */

import Skeleton from "./Skeleton";
import SkeletonText from "./SkeletonText";

interface SkeletonCardProps {
  /** Where this card sits in the queue of blocks on screen. */
  index?: number;
}

export default function SkeletonCard({ index = 0 }: SkeletonCardProps) {
  return (
    <div className="skeleton-card">
      {/* the photo */}
      <Skeleton shape="media" index={index} />
      {/* the title */}
      <Skeleton shape="heading" width="70%" index={index + 1} />
      {/* the description */}
      <SkeletonText lines={2} index={index + 2} />
      {/* price on the left, rating on the right */}
      <div className="skeleton-card__foot">
        <Skeleton shape="line" width="30%" index={index + 4} />
        <Skeleton shape="line" width="18%" index={index + 5} />
      </div>
    </div>
  );
}
