/* ============================================================
   REVIEW AND PAY PAGE  —  shown at  /book/7
   ------------------------------------------------------------
   The dates and guest count arrive in the web address from the
   listing page, so a half-finished booking can be reopened.

   Styles for all sections: styles/pages/book.css
   ============================================================ */

import { notFound } from "next/navigation";
import { listingById } from "@/lib/data/listings";
import BookBodySection from "@/components/book/BookBodySection";

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ listingId: string }>;
  searchParams: Promise<{ checkIn?: string; checkOut?: string; guests?: string }>;
}) {
  const { listingId } = await params;
  const listing = listingById(listingId);
  if (!listing) notFound();

  const query = await searchParams;

  return (
    /* REVIEW AND PAY — trip, cancellation, form, price */
    <BookBodySection
      listing={listing}
      checkIn={query.checkIn ?? listing.availableFrom}
      checkOut={query.checkOut ?? listing.availableTo}
      guests={Number(query.guests ?? 1)}
    />
  );
}
