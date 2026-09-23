/* ============================================================
   ONE BOOKING PAGE  —  shown at  /trips/b1
   ------------------------------------------------------------
   Styles: styles/pages/trips.css
   ============================================================ */

import { notFound } from "next/navigation";
import { bookingById } from "@/lib/data/bookings";
import { listingById } from "@/lib/data/listings";
import { hostById } from "@/lib/data/people";
import TripDetailSection from "@/components/trips/TripDetailSection";

export default async function TripPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = bookingById(id);
  if (!booking) notFound();

  const listing = listingById(booking.listingId)!;

  return (
    /* TRIP DETAIL — status, getting there, rules, price, host */
    <TripDetailSection
      booking={booking}
      listing={listing}
      host={hostById(listing.hostId)!}
    />
  );
}
