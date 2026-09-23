/* ============================================================
   LISTING TITLE — name, rating, place, and the save/share row.
   Styles live in: styles/pages/listing.css  (section 1)
   ============================================================ */

import Link from "next/link";
import type { Listing } from "@/lib/types";
import { count } from "@/lib/format";

export default function ListingTitleSection({ listing }: { listing: Listing }) {
  return (
    <section className="listing-title">
      <div className="page-container">
        <h1 className="listing-title__name">{listing.title}</h1>

        <div className="listing-title__row">
          <p className="listing-title__meta">
            <span>★ {listing.rating}</span>
            <span>·</span>
            <span>{count(listing.reviewCount, "review")}</span>
            <span>·</span>
            <Link href={`/destinations/${listing.citySlug}`}>{listing.location}</Link>
          </p>

          <div className="listing-title__actions">
            <button className="button button--ghost button--small">♡ Save</button>
            <button className="button button--ghost button--small">↗ Share</button>
          </div>
        </div>
      </div>
    </section>
  );
}
