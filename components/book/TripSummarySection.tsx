/* ============================================================
   TRIP SUMMARY — what is being booked, before any payment.
   Styles live in: styles/pages/book.css  (section 1)
   ============================================================ */

import Link from "next/link";
import type { Listing } from "@/lib/types";
import { count, dateRange, longDate } from "@/lib/format";
import DataRow from "@/components/shared/DataRow";
import Panel from "@/components/shared/Panel";

export default function TripSummarySection({
  listing,
  checkIn,
  checkOut,
  guests,
}: {
  listing: Listing;
  checkIn: string;
  checkOut: string;
  guests: number;
}) {
  return (
    <Panel
      title="Your trip"
      action={<Link className="panel__link" href={`/listing/${listing.id}`}>Change</Link>}
    >
      <div className="trip-summary">
        <img className="trip-summary__photo" src={listing.photos[0]} alt="" />
        <div>
          <h3 className="trip-summary__title">{listing.title}</h3>
          <p className="trip-summary__meta">{listing.location}</p>
          <p className="trip-summary__meta">★ {listing.rating} · {count(listing.reviewCount, "review")}</p>
        </div>
      </div>

      <DataRow label="Dates" value={dateRange(checkIn, checkOut)} />
      <DataRow label="Check in" value={longDate(checkIn)} />
      <DataRow label="Check out" value={longDate(checkOut)} />
      <DataRow label="Guests" value={count(guests, "guest")} />
    </Panel>
  );
}
