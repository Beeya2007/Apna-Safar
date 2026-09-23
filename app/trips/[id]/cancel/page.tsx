/* ============================================================
   CANCEL BOOKING PAGE  —  shown at  /trips/b1/cancel
   ------------------------------------------------------------
   The refund is worked out by lib/refund.ts and shown before
   anything is confirmed.

   Styles: styles/pages/trips.css
   ============================================================ */

import { notFound } from "next/navigation";
import { bookingById } from "@/lib/data/bookings";
import { listingById } from "@/lib/data/listings";
import { refundFor } from "@/lib/refund";
import CancelSection from "@/components/trips/CancelSection";

export default async function CancelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = bookingById(id);
  if (!booking) notFound();

  const listing = listingById(booking.listingId)!;

  return (
    /* CANCEL — what you are cancelling, and what comes back */
    <CancelSection
      booking={booking}
      listing={listing}
      refund={refundFor(booking, listing.cancellation)}
    />
  );
}
