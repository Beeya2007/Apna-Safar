/* ============================================================
   TRIPS LIST — the tabs and whichever bookings they select.
   Styles live in: styles/pages/trips.css  (sections 1 and 2)
   ============================================================ */


"use client";

import type { Booking, BookingStatus } from "@/lib/types";
import { BOOKINGS } from "@/lib/data/bookings";
import PageHeading from "@/components/shared/PageHeading";
import Tabs from "@/components/shared/Tabs";
import EmptyState from "@/components/shared/EmptyState";
import { Suitcase } from "@phosphor-icons/react";
import TripCard from "./TripCard";

/* The three views, and which booking states each one shows. */
const VIEWS: { label: string; slug: string; statuses: BookingStatus[] }[] = [
  { label: "Upcoming",  slug: "upcoming",  statuses: ["upcoming", "pending"] },
  { label: "Past",      slug: "past",      statuses: ["completed"] },
  { label: "Cancelled", slug: "cancelled", statuses: ["cancelled"] },
];

export default function TripsListSection({ show }: { show?: string }) {
  const view = VIEWS.find((v) => v.slug === show) ?? VIEWS[0];
  const bookings: Booking[] = BOOKINGS.filter((b) => view.statuses.includes(b.status));

  return (
    <section className="page-container trips">
      <PageHeading title="My trips" lede="Everything you have booked, and everything you have been." />

      {/* 1. TABS — upcoming, past, cancelled */}
      <Tabs
        active={view.label}
        tabs={VIEWS.map((v) => ({
          label: v.label,
          href: `/trips?show=${v.slug}`,
          count: BOOKINGS.filter((b) => v.statuses.includes(b.status)).length,
        }))}
      />

      {/* 2. THE BOOKINGS */}
      {bookings.length === 0 ? (
        <EmptyState
          icon={<Suitcase size={32} />}
          title={`No ${view.label.toLowerCase()} trips`}
          body="When you book somewhere it will appear here, with the address, the check-in time and a way to reach your host."
          actionLabel="Find somewhere to stay"
          actionHref="/search"
        />
      ) : (
        <div className="trips__list">
          {bookings.map((booking) => (
            <TripCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </section>
  );
}
