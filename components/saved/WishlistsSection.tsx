/* ============================================================
   WISHLISTS — the saved lists, as tiles showing what is in them.
   Styles live in: styles/pages/saved.css  (section 1)
   ============================================================ */

import Link from "next/link";
import { WISHLISTS } from "@/lib/data/bookings";
import { listingById } from "@/lib/data/listings";
import { count } from "@/lib/format";
import PageHeading from "@/components/shared/PageHeading";
import EmptyState from "@/components/shared/EmptyState";

export default function WishlistsSection() {
  return (
    <section className="page-container saved">
      <PageHeading title="Wishlists" lede="Places you saved, grouped however you like." />

      {WISHLISTS.length === 0 ? (
        <EmptyState
          icon="♡"
          title="Nothing saved yet"
          body="Tap the heart on any place to keep it here. Lists are private until you share them."
          actionLabel="Start looking"
          actionHref="/search"
        />
      ) : (
        <div className="saved__grid">
          {WISHLISTS.map((list) => {
            const covers = list.listingIds
              .map((id) => listingById(id))
              .filter(Boolean)
              .slice(0, 4);

            return (
              <Link key={list.id} href={`/wishlists/${list.id}`} className="wishlist-tile">
                {/* FOUR-UP PREVIEW of what is in the list */}
                <div className="wishlist-tile__mosaic">
                  {covers.map((listing, index) => (
                    <img key={index} src={listing!.photos[0]} alt="" loading="lazy" />
                  ))}
                </div>
                <h3 className="wishlist-tile__name">{list.name}</h3>
                <p className="wishlist-tile__count">
                  {count(list.listingIds.length, "place")}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
