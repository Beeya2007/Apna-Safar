/* ============================================================
   LOCATION — the neighbourhood, described rather than pinned.
   ------------------------------------------------------------
   The exact address is deliberately not shown before booking.
   Styles live in: styles/pages/listing.css  (section 6)
   ============================================================ */


"use client";

import type { Listing } from "@/lib/types";
import { MapPin } from "@phosphor-icons/react";

export default function LocationSection({ listing }: { listing: Listing }) {
  return (
    <section className="listing-location">
      <div className="page-container">
        <h2 className="listing-block__title">Where you will be</h2>
        <p className="listing-block__text">{listing.neighbourhood}</p>

        <div className="listing-location__map">
          <MapPin className="listing-location__pin icon" size={24} />
          <p className="listing-location__note">
            {listing.location} — the exact address is shared once you book.
          </p>
        </div>
      </div>
    </section>
  );
}
