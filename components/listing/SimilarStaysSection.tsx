/* ============================================================
   SIMILAR STAYS — other places of the same kind.
   Styles live in: styles/pages/listing.css  (section 8)
   ============================================================ */

import type { Listing } from "@/lib/types";
import ListingCard from "@/components/shared/ListingCard";

export default function SimilarStaysSection({ listings }: { listings: Listing[] }) {
  if (listings.length === 0) return null;

  return (
    <section className="similar-stays">
      <div className="page-container">
        <h2 className="similar-stays__title">More places like this</h2>
        <div className="similar-stays__cards">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
