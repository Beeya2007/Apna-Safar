/* ============================================================
   BOOKING CONFIRMED PAGE  —  shown at  /book/7/confirmed
   ------------------------------------------------------------
   The last screen of the booking flow. Everything it shows is
   read from the web address, so the page can be reloaded or
   shared without losing the details.

   Styles: styles/pages/book.css
   ============================================================ */

import { notFound } from "next/navigation";
import { listingById } from "@/lib/data/listings";
import { hostById } from "@/lib/data/people";
import ConfirmedSection from "@/components/book/ConfirmedSection";

export default async function ConfirmedPage({
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
    /* CONFIRMED — the receipt and where to go next */
    <ConfirmedSection
      listing={listing}
      host={hostById(listing.hostId)!}
      checkIn={query.checkIn ?? listing.availableFrom}
      checkOut={query.checkOut ?? listing.availableTo}
      guests={Number(query.guests ?? 1)}
    />
  );
}
