/* ============================================================
   CANCEL BOOKING — the refund is shown BEFORE anything is
   confirmed, never after. That is the whole point of the screen.
   Styles live in: styles/pages/trips.css  (section 4)
   ============================================================ */

"use client";

import { useState } from "react";
import Link from "next/link";
import type { Booking, Listing } from "@/lib/types";
import type { Refund } from "@/lib/refund";
import { dateRange, rupees } from "@/lib/format";
import PageHeading from "@/components/shared/PageHeading";
import Panel from "@/components/shared/Panel";
import ConfirmButton from "@/components/shared/ConfirmButton";
import DataRow from "@/components/shared/DataRow";

export default function CancelSection({
  booking,
  listing,
  refund,
}: {
  booking: Booking;
  listing: Listing;
  refund: Refund;
}) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <section className="page-container cancel">
        <PageHeading
          title="Booking cancelled"
          lede={
            refund.amount > 0
              ? `${rupees(refund.amount)} is on its way back to the card you paid with. It usually lands within 5 to 7 working days.`
              : "Nothing was refundable on this booking, so no money is coming back."
          }
        />
        <Link href="/trips" className="button button--primary button--large">
          Back to My trips
        </Link>
      </section>
    );
  }

  return (
    <section className="page-container cancel">
      <PageHeading
        title="Cancel this booking"
        lede="Read the refund before you confirm. Cancelling cannot be undone."
      />

      <Panel title="What you are cancelling">
        <DataRow label="Where" value={listing.location} />
        <DataRow label="Dates" value={dateRange(booking.checkIn, booking.checkOut)} />
        <DataRow label="You paid" value={rupees(booking.price.total)} />
      </Panel>

      {/* THE NUMBER — the reason anyone opens this page */}
      <Panel title="What you get back">
        <p className={refund.amount > 0 ? "cancel__amount" : "cancel__amount cancel__amount--none"}>
          {rupees(refund.amount)}
        </p>
        <p className="cancel__explanation">{refund.explanation}</p>
        {refund.amount > 0 && (
          <p className="cancel__explanation">
            The service fee of {rupees(booking.price.serviceFee)} is not returned.
          </p>
        )}
      </Panel>

      {/* ASK FIRST — a cancellation cannot be undone, and the
          refund is repeated inside the popup so the number is
          on screen at the moment of the decision. */}
      <div className="cancel__actions">
        <ConfirmButton
          size="large"
          destructive
          label="Cancel the booking"
          title="Cancel this booking?"
          body={
            <>
              <p>
                {listing.location}, {dateRange(booking.checkIn, booking.checkOut)}.
                This cannot be undone, and the nights go back on sale straight away.
              </p>
              <p className="cancel__modal-figure">
                {refund.amount > 0
                  ? `${rupees(refund.amount)} comes back to you.`
                  : "Nothing comes back to you."}
              </p>
            </>
          }
          confirmLabel="Yes, cancel it"
          cancelLabel="Keep the booking"
          onConfirm={() => setDone(true)}
        />
        <Link href={`/trips/${booking.id}`} className="button button--ghost button--large">
          Keep it
        </Link>
      </div>
    </section>
  );
}
