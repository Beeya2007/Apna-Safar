/* ============================================================
   HOST LISTINGS — the places this host owns, published or not.
   Styles live in: styles/pages/host.css  (section 3)
   ============================================================ */

"use client";

import Link from "next/link";
import ConfirmButton from "@/components/shared/ConfirmButton";
import { LISTING_STATS, myListings } from "@/lib/data/host";
import { count, rupees } from "@/lib/format";
import PageHeading from "@/components/shared/PageHeading";

export default function ListingsSection() {
  return (
    <section className="page-container host">
      <PageHeading title="Your places" lede="Everything you have listed, and how it is doing." />

      <div className="host__actions">
        <Link href="/host/listings/new" className="button button--primary">
          Add a place
        </Link>
      </div>

      <div className="host-listings">
        {myListings().map((listing) => {
          const stats = LISTING_STATS[listing.id];
          return (
            <article className="host-listing" key={listing.id}>
              <img className="host-listing__photo" src={listing.photos[0]} alt="" loading="lazy" />

              <div className="host-listing__body">
                <h2 className="host-listing__title">{listing.title}</h2>
                <p className="host-listing__meta">{listing.location}</p>
                <p className="host-listing__meta">
                  {rupees(listing.pricePerNight)} a night · {count(listing.guests, "guest")}
                </p>
                <p className="host-listing__stats">
                  {stats.published
                    ? `${stats.views.toLocaleString("en-IN")} views · ${count(stats.bookings, "booking")}`
                    : "Draft — not visible to guests"}
                </p>
              </div>

              <div className="host-listing__actions">
                <span className={stats.published ? "status-pill status-pill--upcoming" : "status-pill status-pill--pending"}>
                  {stats.published ? "Live" : "Draft"}
                </span>
                <Link href={`/host/listings/${listing.id}/edit`} className="button button--secondary button--small">
                  Edit
                </Link>
                <Link href={`/listing/${listing.id}`} className="button button--ghost button--small">
                  View
                </Link>
                {/* Taking a place down cancels nothing already
                    booked, but it does stop new bookings — so
                    it asks first. */}
                <ConfirmButton
                  variant="ghost"
                  size="small"
                  destructive={stats.published}
                  label={stats.published ? "Take down" : "Publish"}
                  title={stats.published
                    ? `Take ${listing.location} down?`
                    : `Publish ${listing.location}?`}
                  body={stats.published
                    ? "Guests will no longer find it in search, and it stops taking new bookings. Stays already booked are unaffected, and you can put it back at any time."
                    : "It becomes visible in search straight away and can be booked by anyone. You can take it down again at any time."}
                  confirmLabel={stats.published ? "Take it down" : "Publish it"}
                  cancelLabel="Leave it as it is"
                  onConfirm={() => { /* wired up when listings are editable */ }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
