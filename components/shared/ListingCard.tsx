/* ============================================================
   LISTING CARD — one "place to stay" tile in a grid.
   Styles live in: styles/components/listing-card.css
   ============================================================ */

import Link from "next/link";
import type { Listing } from "@/lib/types";

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/listing/${listing.id}`} className="listing-card">

      {/* PHOTO — cover image with a favourite heart on top */}
      <div className="listing-card__photo">
        <img src={listing.photo} alt={listing.location} loading="lazy" />
        <span className="listing-card__favourite" aria-hidden>♡</span>
      </div>

      {/* HEADER ROW — place name on the left, star rating on the right */}
      <div className="listing-card__header">
        <h3 className="listing-card__location">{listing.location}</h3>
        <span className="listing-card__rating">★ {listing.rating}</span>
      </div>

      {/* META — supporting grey lines */}
      <p className="listing-card__meta">{listing.distance}</p>
      <p className="listing-card__meta">{listing.dates}</p>

      {/* PRICE — per night */}
      <p className="listing-card__price">
        <strong>₹{listing.pricePerNight.toLocaleString("en-IN")}</strong> night
      </p>
    </Link>
  );
}
