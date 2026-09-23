/* ============================================================
   BOOK BODY — the whole review-and-pay screen: the trip, the
   policy and the form on the left, the price beside them.
   Styles live in: styles/pages/book.css
   ============================================================ */

import type { Listing } from "@/lib/types";
import { priceStay } from "@/lib/format";
import PageHeading from "@/components/shared/PageHeading";
import TripSummarySection from "./TripSummarySection";
import PriceSection from "./PriceSection";
import CancellationSection from "./CancellationSection";
import PayForm from "./PayForm";

export default function BookBodySection({
  listing,
  checkIn,
  checkOut,
  guests,
}: {
  listing: Listing;
  checkIn: string;
  checkOut: string;
  guests: number;
}) {
  const price = priceStay(listing, checkIn, checkOut);

  return (
    <section className="page-container book">
      <PageHeading title="Review and pay" />

      <div className="book__layout">
        <div className="book__main">

          {/* 1. TRIP SUMMARY — what is being booked */}
          <TripSummarySection listing={listing} checkIn={checkIn}
            checkOut={checkOut} guests={guests} />

          {/* 2. CANCELLATION — stated before paying, never after */}
          <CancellationSection policy={listing.cancellation} />

          {/* 3. PAY FORM — guest details, card, confirm */}
          <PayForm listingId={listing.id} total={price.total}
            checkIn={checkIn} checkOut={checkOut} guests={guests} />

        </div>

        {/* 4. PRICE — sticks beside the form on desktop */}
        <div className="book__aside">
          <PriceSection price={price} />
        </div>
      </div>
    </section>
  );
}
