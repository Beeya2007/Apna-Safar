/* ============================================================
   CALENDAR — which nights are open, and which are taken.
   ------------------------------------------------------------
   Uses the same <Calendar /> a guest sees, so the host and the
   guest are looking at one design, not two. The nights already
   booked are read from real bookings, so the calendar cannot
   disagree with them.
   Styles live in: styles/pages/host/05-calendar.css
   ============================================================ */

"use client";

import { useState } from "react";
import type { Listing } from "@/lib/types";
import { rupees } from "@/lib/format";
import PageHeading from "@/components/shared/PageHeading";
import Panel from "@/components/shared/Panel";
import Dropdown from "@/components/shared/Dropdown";
import Calendar from "@/components/shared/Calendar";

export default function CalendarSection({
  listings,
  bookedByListing,
}: {
  listings: Listing[];
  /** Listing id → every night already booked, as ISO dates. */
  bookedByListing: Record<string, string[]>;
}) {
  const [listingId, setListingId] = useState(listings[0].id);
  const listing = listings.find((l) => l.id === listingId)!;
  const taken = new Set(bookedByListing[listingId] ?? []);

  return (
    <section className="page-container host">
      <PageHeading title="Calendar" lede="Tinted nights are booked. Everything else is open." />

      <div className="host-calendar__picker">
        <Dropdown
          label="Which place"
          value={listingId}
          onChange={setListingId}
          options={listings.map((l) => ({ value: l.id, label: l.location, note: l.title }))}
        />
      </div>

      <Panel
        title={listing.location}
        action={<span className="host__hint">{rupees(listing.pricePerNight)} a night</span>}
      >
        <div className="host-calendar__grid">
          <Calendar
            range={{}}
            onPick={() => { /* editing availability is not built yet */ }}
            minDate={listing.availableFrom}
            startAt={listing.availableFrom}
            taken={taken}
            labelFor={(iso) =>
              taken.has(iso) ? "Booked" : rupees(listing.pricePerNight)
            }
          />
        </div>
      </Panel>
    </section>
  );
}
