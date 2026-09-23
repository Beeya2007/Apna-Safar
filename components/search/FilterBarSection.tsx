/* ============================================================
   FILTER BAR — property type, price cap, amenity and sort.
   ------------------------------------------------------------
   Every control is a LINK, not a button. Each one rebuilds the
   address with one value changed and the rest left alone, so
   filters stack instead of wiping each other out.
   Styles live in: styles/pages/search.css  (section 2)
   ============================================================ */

import Link from "next/link";
import type { SearchQuery } from "@/lib/search";
import { PRICE_STEPS, SORT_OPTIONS, withParam } from "@/lib/search";
import { AMENITIES } from "@/lib/data/listings";
import { rupees } from "@/lib/format";

const TYPES = ["Beachfront", "Mountains", "City", "Countryside", "Pools", "Heritage", "Cabins", "Islands"];

export default function FilterBarSection({ query }: { query: SearchQuery }) {
  return (
    <section className="filter-bar">
      <div className="page-container">

        {/* PROPERTY TYPE — clicking the active one clears it */}
        <div className="filter-bar__group">
          <span className="filter-bar__legend">Type</span>
          <div className="chip-row">
            {TYPES.map((type) => (
              <Link key={type} className="chip"
                aria-current={query.type === type ? "true" : undefined}
                href={withParam(query, "type", query.type === type ? undefined : type)}>
                {type}
              </Link>
            ))}
          </div>
        </div>

        {/* PRICE CAP — nightly rate, before fees */}
        <div className="filter-bar__group">
          <span className="filter-bar__legend">Price a night</span>
          <div className="chip-row">
            {PRICE_STEPS.map((step) => (
              <Link key={step} className="chip"
                aria-current={query.maxPrice === String(step) ? "true" : undefined}
                href={withParam(query, "maxPrice", query.maxPrice === String(step) ? undefined : String(step))}>
                Under {rupees(step)}
              </Link>
            ))}
          </div>
        </div>

        {/* AMENITY — one at a time, kept deliberately simple */}
        <div className="filter-bar__group">
          <span className="filter-bar__legend">Must have</span>
          <div className="chip-row">
            {AMENITIES.slice(0, 8).map((amenity) => (
              <Link key={amenity} className="chip"
                aria-current={query.amenity === amenity ? "true" : undefined}
                href={withParam(query, "amenity", query.amenity === amenity ? undefined : amenity)}>
                {amenity}
              </Link>
            ))}
          </div>
        </div>

        {/* SORT ORDER */}
        <div className="filter-bar__group">
          <span className="filter-bar__legend">Sort by</span>
          <div className="chip-row">
            {SORT_OPTIONS.map((option) => (
              <Link key={option.value} className="chip"
                aria-current={(query.sort ?? "recommended") === option.value ? "true" : undefined}
                href={withParam(query, "sort", option.value)}>
                {option.label}
              </Link>
            ))}
          </div>
        </div>

        <Link className="filter-bar__clear" href="/search">Clear all filters</Link>

      </div>
    </section>
  );
}
