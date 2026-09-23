/* ============================================================
   LISTING TITLE — name, rating, place, and the save/share row.
   Styles live in: styles/pages/listing.css  (section 1)
   ============================================================ */


"use client";

import Link from "next/link";
import { Star, Heart, ShareNetwork } from "@phosphor-icons/react";
import type { Listing } from "@/lib/types";
import { count } from "@/lib/format";

export default function ListingTitleSection({ listing }: { listing: Listing }) {
  return (
    <section className="listing-title">
      <div className="page-container">
        <h1 className="listing-title__name">{listing.title}</h1>

        <div className="listing-title__row">
          <p className="listing-title__meta">
            <span className="icon-text icon-text--sm">
              <Star className="icon" weight="fill" /> {listing.rating}
            </span>
            <span>·</span>
            <span>{count(listing.reviewCount, "review")}</span>
            <span>·</span>
            <Link href={`/destinations/${listing.citySlug}`}>{listing.location}</Link>
          </p>

          <div className="listing-title__actions">
            <button className="button button--ghost button--small icon-text icon-text--sm">
              <Heart className="icon" /> Save
            </button>
            <button className="button button--ghost button--small icon-text icon-text--sm">
              <ShareNetwork className="icon" /> Share
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
