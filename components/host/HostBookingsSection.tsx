/* ============================================================
   HOST BOOKINGS — who has booked, and what needs answering.
   Styles live in: styles/pages/host.css  (section 6)
   ============================================================ */

import { myBookings } from "@/lib/data/host";
import { listingById } from "@/lib/data/listings";
import { count, dateRange, longDate, rupees } from "@/lib/format";
import PageHeading from "@/components/shared/PageHeading";
import Panel from "@/components/shared/Panel";
import DataRow from "@/components/shared/DataRow";
import StatusPill from "@/components/shared/StatusPill";
import EmptyState from "@/components/shared/EmptyState";

export default function HostBookingsSection() {
  const bookings = myBookings();

  return (
    <section className="page-container host">
      <PageHeading title="Bookings" lede="Every stay booked against your places." />

      {bookings.length === 0 ? (
        <EmptyState
          icon="📖"
          title="No bookings yet"
          body="Once a guest books one of your places it will show up here, with their dates and what you will be paid."
          actionLabel="Check your listings"
          actionHref="/host/listings"
        />
      ) : (
        bookings.map((booking) => {
          const listing = listingById(booking.listingId)!;
          return (
            <Panel key={booking.id}
              title={listing.location}
              action={<StatusPill status={booking.status} />}>
              <DataRow label="Dates" value={dateRange(booking.checkIn, booking.checkOut)} />
              <DataRow label="Nights" value={count(booking.price.nights, "night")} />
              <DataRow label="Guests" value={count(booking.guests, "guest")} />
              <DataRow label="Booked on" value={longDate(booking.bookedOn)} />
              <DataRow label="Guest pays" value={rupees(booking.price.total)} />
              <DataRow label="You receive"
                value={rupees(booking.price.nightsSubtotal + booking.price.cleaningFee)} strong />
            </Panel>
          );
        })
      )}
    </section>
  );
}
