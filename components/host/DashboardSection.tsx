/* ============================================================
   HOST DASHBOARD — what needs doing, what came in, what is next.
   Styles live in: styles/pages/host.css  (section 2)
   ============================================================ */

import Link from "next/link";
import { HOST_TASKS, LISTING_STATS, myBookings, myListings, nextPayout, totalEarned } from "@/lib/data/host";
import { listingById } from "@/lib/data/listings";
import { count, dateRange, longDate, rupees } from "@/lib/format";
import PageHeading from "@/components/shared/PageHeading";
import Panel from "@/components/shared/Panel";
import DataRow from "@/components/shared/DataRow";
import StatusPill from "@/components/shared/StatusPill";

export default function DashboardSection() {
  const upcoming = myBookings().filter((b) => b.status === "upcoming");
  const payout = nextPayout();

  return (
    <section className="page-container host">
      <PageHeading title="Hosting" lede="Two places, and what they are doing." />

      {/* 1. ATTENTION — the things asking for a decision */}
      <Panel title="Needs you">
        {HOST_TASKS.map((task) => (
          <Link className="host-task" href={task.href} key={task.text}>
            <span aria-hidden>{task.icon}</span>
            <span>{task.text}</span>
          </Link>
        ))}
      </Panel>

      <div className="host__row">
        {/* 2. EARNINGS */}
        <Panel title="Earnings"
          action={<Link className="panel__link" href="/host/earnings">All payouts</Link>}>
          <p className="host__figure type-numeric">{rupees(totalEarned())}</p>
          <p className="host__figure-note">paid out so far</p>
          {payout && (
            <DataRow
              label={`Next payout, ${longDate(payout.date)}`}
              value={rupees(payout.net)}
              strong
            />
          )}
        </Panel>

        {/* 3. LISTING PERFORMANCE */}
        <Panel title="Your places"
          action={<Link className="panel__link" href="/host/listings">Manage</Link>}>
          {myListings().map((listing) => {
            const stats = LISTING_STATS[listing.id];
            return (
              <DataRow
                key={listing.id}
                label={listing.location}
                value={
                  stats.published
                    ? `${stats.views.toLocaleString("en-IN")} views · ${count(stats.bookings, "booking")}`
                    : "Not published"
                }
              />
            );
          })}
        </Panel>
      </div>

      {/* 4. UPCOMING STAYS */}
      <Panel title="Who is coming"
        action={<Link className="panel__link" href="/host/bookings">All bookings</Link>}>
        {upcoming.length === 0 ? (
          <p className="host__empty">Nothing booked yet.</p>
        ) : (
          upcoming.map((booking) => (
            <DataRow
              key={booking.id}
              label={`${listingById(booking.listingId)!.location} · ${dateRange(booking.checkIn, booking.checkOut)}`}
              value={<StatusPill status={booking.status} />}
            />
          ))
        )}
      </Panel>
    </section>
  );
}
