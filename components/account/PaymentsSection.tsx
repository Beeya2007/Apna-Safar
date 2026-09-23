/* ============================================================
   PAYMENTS — cards on file, and a receipt per booking.
   Styles live in: styles/pages/account.css  (section 3)
   ============================================================ */

"use client";

import Link from "next/link";
import ConfirmButton from "@/components/shared/ConfirmButton";
import { BOOKINGS } from "@/lib/data/bookings";
import { listingById } from "@/lib/data/listings";
import { longDate, rupees } from "@/lib/format";
import PageHeading from "@/components/shared/PageHeading";
import Panel from "@/components/shared/Panel";
import DataRow from "@/components/shared/DataRow";

export default function PaymentsSection() {
  return (
    <section className="page-container account-page">
      <PageHeading
        title="Payments"
        lede="Cards you have saved, and what you have been charged."
      />

      <Panel
        title="Saved cards"
        action={<button className="panel__link">Add a card</button>}
      >
        {/* Removing a card asks first — a card removed by
            accident means re-typing it at the worst moment. */}
        {[
          { name: "Visa ending 4242", expires: "Expires 08/28" },
          { name: "Mastercard ending 8801", expires: "Expires 02/27" },
        ].map((card) => (
          <DataRow
            key={card.name}
            label={card.name}
            value={
              <span className="payments__card">
                <span>{card.expires}</span>
                <ConfirmButton
                  variant="ghost"
                  size="small"
                  destructive
                  label="Remove"
                  title={`Remove ${card.name}?`}
                  body="Bookings already paid for are unaffected. You will need to enter the card again the next time you use it."
                  confirmLabel="Remove the card"
                  cancelLabel="Keep it"
                  onConfirm={() => { /* wired up when accounts are real */ }}
                />
              </span>
            }
          />
        ))}
      </Panel>

      <Panel title="Receipts">
        {BOOKINGS.map((booking) => {
          const listing = listingById(booking.listingId)!;
          return (
            <DataRow
              key={booking.id}
              label={`${listing.location} · ${longDate(booking.bookedOn)}`}
              value={
                <Link href={`/trips/${booking.id}`} className="type-numeric">
                  {rupees(booking.price.total)}
                </Link>
              }
            />
          );
        })}
      </Panel>
    </section>
  );
}
