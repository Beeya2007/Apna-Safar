/* ============================================================
   TRIP CARD — one booking in the My trips list.
   Styles live in: styles/pages/trips.css  (section 2)
   ============================================================ */

import Link from "next/link";
import type { Booking } from "@/lib/types";
import { listingById } from "@/lib/data/listings";
import { count, dateRange, rupees } from "@/lib/format";
import StatusPill from "@/components/shared/StatusPill";

export default function TripCard({ booking }: { booking: Booking }) {
  const listing = listingById(booking.listingId)!;

  return (
    <Link href={`/trips/${booking.id}`} className="trip-card">
      <img className="trip-card__photo" src={listing.photos[0]} alt="" loading="lazy" />

      <div className="trip-card__body">
        <div className="trip-card__head">
          <h3 className="trip-card__title">{listing.location}</h3>
          <StatusPill status={booking.status} />
        </div>

        <p className="trip-card__meta">{listing.title}</p>
        <p className="trip-card__meta">
          {dateRange(booking.checkIn, booking.checkOut)} · {count(booking.guests, "guest")}
        </p>
        <p className="trip-card__total type-numeric">{rupees(booking.price.total)}</p>
      </div>
    </Link>
  );
}
