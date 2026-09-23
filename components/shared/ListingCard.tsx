/* ============================================================
   LISTING CARD — one "place to stay" tile in a grid.
   Styles live in: styles/components/listing-card.css
   ============================================================ */


"use client";

import Link from "next/link";
import type { Listing } from "@/lib/types";
import { dateRange, distance, rupees } from "@/lib/format";
import { Heart, Star } from "@phosphor-icons/react";

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/listing/${listing.id}`} className="listing-card link-plain">

      {/* PHOTO — cover image with a favourite heart on top */}
      <div className="listing-card__photo">
        <img src={listing.photos[0]} alt={listing.title} loading="lazy" />
        <Heart className="listing-card__favourite icon" size={24} />
      </div>

      {/* HEADER ROW — place name on the left, star rating on the right */}
      <div className="listing-card__header">
        <h3 className="listing-card__location">{listing.location}</h3>
        <span className="listing-card__rating icon-text icon-text--sm">
          <Star className="icon" weight="fill" /> {listing.rating}
        </span>
      </div>

      {/* META — supporting grey lines */}
      <p className="listing-card__meta">{distance(listing.distanceKm)}</p>
      <p className="listing-card__meta">
        {dateRange(listing.availableFrom, listing.availableTo)}
      </p>

      {/* PRICE — per night */}
      <p className="listing-card__price">
        <strong>{rupees(listing.pricePerNight)}</strong> night
      </p>
    </Link>
  );
}
