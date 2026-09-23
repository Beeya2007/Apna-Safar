/* ============================================================
   BOOKING CONFIRMED — the receipt, and the two things a guest
   wants next: the booking itself, and the way to message the host.
   Styles live in: styles/pages/book.css  (section 5)
   ============================================================ */

import Link from "next/link";
import type { Host, Listing } from "@/lib/types";
import { count, dateRange, longDate, priceStay } from "@/lib/format";
import Panel from "@/components/shared/Panel";
import DataRow from "@/components/shared/DataRow";
import PriceLines from "@/components/shared/PriceLines";

export default function ConfirmedSection({
  listing,
  host,
  checkIn,
  checkOut,
  guests,
}: {
  listing: Listing;
  host: Host;
  checkIn: string;
  checkOut: string;
  guests: number;
}) {
  const price = priceStay(listing, checkIn, checkOut);

  return (
    <section className="page-container confirmed">

      {/* THE GOOD NEWS */}
      <div className="confirmed__banner">
        <span className="confirmed__tick" aria-hidden>✓</span>
        <h1 className="confirmed__title">You are booked</h1>
        <p className="confirmed__lede">
          {listing.location}, {dateRange(checkIn, checkOut)}. We have sent the
          details to your phone, and {host.name} knows you are coming.
        </p>
      </div>

      <Panel title="Your stay">
        <DataRow label="Where" value={listing.title} />
        <DataRow label="Check in" value={`${longDate(checkIn)}, from 14:00`} />
        <DataRow label="Check out" value={`${longDate(checkOut)}, by 11:00`} />
        <DataRow label="Guests" value={count(guests, "guest")} />
        <DataRow label="Host" value={`${host.name} ${host.avatar}`} />
      </Panel>

      <Panel title="What you paid">
        <PriceLines price={price} />
      </Panel>

      <div className="confirmed__actions">
        <Link href="/trips" className="button button--primary button--large">
          See it in My trips
        </Link>
        <Link href="/messages" className="button button--secondary button--large">
          Message {host.name}
        </Link>
      </div>

    </section>
  );
}
