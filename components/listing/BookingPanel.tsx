/* ============================================================
   BOOKING PANEL — dates, guests, price, Reserve.
   ------------------------------------------------------------
   Sticks beside the content on desktop so the price is always
   in view. The total comes from priceStay() — the same
   function the payment page and the receipt use, so the three
   can never disagree.

   The calendar is ours (components/shared/Calendar.tsx) and is
   limited to the nights this host has actually opened.
   Styles live in: styles/pages/listing/03-booking-panel.css
   ============================================================ */

"use client";

import { useState } from "react";
import Link from "next/link";
import type { Listing } from "@/lib/types";
import type { Range } from "@/lib/calendar";
import { CANCELLATION_TEXT, count, priceStay, rupees } from "@/lib/format";
import PriceLines from "@/components/shared/PriceLines";
import DateRangeField from "@/components/shared/DateRangeField";
import Dropdown from "@/components/shared/Dropdown";

export default function BookingPanel({ listing }: { listing: Listing }) {
  const [range, setRange] = useState<Range>({
    from: listing.availableFrom,
    to: listing.availableTo,
  });
  const [guests, setGuests] = useState("1");

  const complete = Boolean(range.from && range.to);
  const price = priceStay(listing, range.from ?? "", range.to ?? "");
  const datesValid = complete && price.nights > 0;

  const guestOptions = Array.from({ length: listing.guests }, (_, i) => ({
    value: String(i + 1),
    label: count(i + 1, "guest"),
  }));

  const bookHref =
    `/book/${listing.id}?checkIn=${range.from}&checkOut=${range.to}&guests=${guests}`;

  return (
    <aside className="booking-panel">
      <p className="booking-panel__price">
        <strong>{rupees(listing.pricePerNight)}</strong> night
      </p>

      {/* DATES — our calendar, held to what the host has opened */}
      <div className="booking-panel__dates">
        <DateRangeField
          range={range}
          onChange={setRange}
          minDate={listing.availableFrom}
          maxDate={listing.availableTo}
        />
      </div>

      <div className="booking-panel__guests">
        <Dropdown label="Guests" options={guestOptions} value={guests} onChange={setGuests} />
      </div>

      {/* Nothing is charged here — this only carries the dates
          through to the payment page. */}
      {datesValid ? (
        <Link href={bookHref} className="button button--primary button--full">
          Reserve
        </Link>
      ) : (
        <p className="booking-panel__warning">
          {complete
            ? "Check out has to be after check in."
            : "Pick both dates to see the total."}
        </p>
      )}

      {datesValid && (
        <>
          <p className="booking-panel__note">You will not be charged yet.</p>
          <PriceLines price={price} />
        </>
      )}

      <p className="booking-panel__policy">
        {CANCELLATION_TEXT[listing.cancellation]}
      </p>
    </aside>
  );
}
