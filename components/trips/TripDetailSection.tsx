/* ============================================================
   TRIP DETAIL — one booking, arranged around the things a
   traveller needs on the day: where it is, when to arrive, how
   to reach the host.
   Styles live in: styles/pages/trips.css  (section 3)
   ============================================================ */

import Link from "next/link";
import type { Booking, Host, Listing } from "@/lib/types";
import { CANCELLATION_TEXT, count, dateRange, longDate } from "@/lib/format";
import PageHeading from "@/components/shared/PageHeading";
import Panel from "@/components/shared/Panel";
import DataRow from "@/components/shared/DataRow";
import PriceLines from "@/components/shared/PriceLines";
import StatusPill from "@/components/shared/StatusPill";
import Avatar from "@/components/shared/Avatar";

export default function TripDetailSection({
  booking,
  listing,
  host,
}: {
  booking: Booking;
  listing: Listing;
  host: Host;
}) {
  const cancellable = booking.status === "upcoming" || booking.status === "pending";

  return (
    <section className="page-container trip-detail">
      <PageHeading
        eyebrow={dateRange(booking.checkIn, booking.checkOut)}
        title={listing.location}
        lede={listing.title}
      />

      {/* 1. STATUS — the first thing to know */}
      <div className="trip-detail__status">
        <StatusPill status={booking.status} />
        <span className="trip-detail__ref">Booking {booking.id.toUpperCase()}</span>
      </div>

      <div className="trip-detail__layout">
        <div>
          {/* 2. WHERE AND WHEN */}
          <Panel title="Getting there">
            <DataRow label="Address" value={listing.neighbourhood} />
            <DataRow label="Check in" value={`${longDate(booking.checkIn)}, from ${booking.checkInFrom}`} />
            <DataRow label="Check out" value={`${longDate(booking.checkOut)}, by ${booking.checkOutBy}`} />
            <DataRow label="Guests" value={count(booking.guests, "guest")} />
          </Panel>

          {/* 3. HOUSE RULES */}
          <Panel title="House rules">
            <ul className="trip-detail__rules">
              {listing.houseRules.map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
          </Panel>

          {/* 4. WHAT YOU PAID */}
          <Panel title="What you paid">
            <PriceLines price={booking.price} />
          </Panel>
        </div>

        <div>
          {/* 5. YOUR HOST */}
          <Panel title="Your host">
            <div className="trip-detail__host">
              <Avatar className="trip-detail__avatar" photo={host.photo} emoji={host.avatar} />
              <div>
                <p className="trip-detail__hostname">{host.name}</p>
                <p className="trip-detail__hostmeta">
                  Replies to {host.responseRate}% of messages
                </p>
              </div>
            </div>
            <Link href="/messages" className="button button--secondary button--full">
              Message {host.name}
            </Link>
          </Panel>

          {/* 6. CANCELLING */}
          <Panel title="Need to change plans?">
            <p className="trip-detail__policy">{CANCELLATION_TEXT[listing.cancellation]}</p>
            {cancellable ? (
              <Link href={`/trips/${booking.id}/cancel`} className="button button--ghost button--full">
                Cancel this booking
              </Link>
            ) : (
              <p className="trip-detail__hostmeta">
                This booking is {booking.status} and cannot be changed.
              </p>
            )}
          </Panel>
        </div>
      </div>
    </section>
  );
}
