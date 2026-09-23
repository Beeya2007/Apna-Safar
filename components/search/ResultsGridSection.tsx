/* ============================================================
   RESULTS GRID — the listings that matched, beside the map.
   Falls back to an empty state that says what to loosen.
   Styles live in: styles/pages/search.css  (section 3)
   ============================================================ */


"use client";

import type { Listing } from "@/lib/types";
import ListingCard from "@/components/shared/ListingCard";
import EmptyState from "@/components/shared/EmptyState";
import { MagnifyingGlass } from "@phosphor-icons/react";
import MapPanel from "./MapPanel";

export default function ResultsGridSection({ results }: { results: Listing[] }) {
  if (results.length === 0) {
    return (
      <section className="search-results">
        <div className="page-container">
          <EmptyState
            icon={<MagnifyingGlass size={32} />}
            title="Nothing matched all of that"
            body="Try widening the dates, raising the price cap, or removing the must-have amenity. Clearing the type filter usually helps most."
            actionLabel="Clear all filters"
            actionHref="/search"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="search-results">
      <div className="page-container search-results__layout">

        {/* THE MATCHES */}
        <div className="search-results__cards">
          {results.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* THE MAP — sticks beside the results on desktop */}
        <MapPanel results={results} />

      </div>
    </section>
  );
}
