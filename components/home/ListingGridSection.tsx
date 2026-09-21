/* ============================================================
   LISTING GRID SECTION — the grid of places on the home page.
   Styles live in: styles/pages/home.css  (section 3)
   ============================================================ */

import ListingCard from "@/components/shared/ListingCard";
import { SAMPLE_LISTINGS } from "@/lib/sample-data";

export default function ListingGridSection() {
  return (
    <section className="listing-grid">
      <div className="page-container">

        {/* SECTION HEADING */}
        <h2 className="listing-grid__title">Popular stays right now</h2>

        {/* CARD GRID — column count adapts to screen width */}
        <div className="listing-grid__cards">
          {SAMPLE_LISTINGS.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

      </div>
    </section>
  );
}
