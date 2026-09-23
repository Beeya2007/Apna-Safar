/* ============================================================
   ONE WISHLIST — everything saved into a single list.
   Styles live in: styles/pages/saved.css  (section 2)
   ============================================================ */


"use client";

import type { Wishlist } from "@/lib/types";
import { listingById } from "@/lib/data/listings";
import { count } from "@/lib/format";
import PageHeading from "@/components/shared/PageHeading";
import ListingCard from "@/components/shared/ListingCard";
import EmptyState from "@/components/shared/EmptyState";
import { Heart } from "@phosphor-icons/react";

export default function WishlistDetailSection({ list }: { list: Wishlist }) {
  const listings = list.listingIds.map((id) => listingById(id)).filter(Boolean);

  return (
    <section className="page-container saved">
      <PageHeading
        eyebrow="Wishlist"
        title={list.name}
        lede={count(listings.length, "place")}
      />

      {listings.length === 0 ? (
        <EmptyState
          icon={<Heart size={32} />}
          title="This list is empty"
          body="Save a place from anywhere on the site and it will land here."
          actionLabel="Find somewhere"
          actionHref="/search"
        />
      ) : (
        <div className="saved__listings">
          {listings.map((listing) => (
            <ListingCard key={listing!.id} listing={listing!} />
          ))}
        </div>
      )}
    </section>
  );
}
