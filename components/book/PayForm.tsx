/* ============================================================
   PAY FORM — guest details, payment method, confirm.
   ------------------------------------------------------------
   Nothing here talks to a real payment provider yet. Pressing
   Confirm hands the booking straight to the confirmation page.
   When a provider is chosen, only this one file changes.
   Styles live in: styles/pages/book.css  (section 4)
   ============================================================ */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { rupees } from "@/lib/format";
import Panel from "@/components/shared/Panel";
import Modal from "@/components/shared/Modal";

export default function PayForm({
  listingId,
  total,
  checkIn,
  checkOut,
  guests,
}: {
  listingId: string;
  total: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [asking, setAsking] = useState(false);

  const ready = name.trim().length > 1 && phone.trim().length >= 10;

  /* Submitting opens the popup. Nothing is charged until the
     popup is answered, because this is the point of no return. */
  function askFirst(e: React.FormEvent) {
    e.preventDefault();
    if (ready) setAsking(true);
  }

  function pay() {
    setAsking(false);
    setSubmitting(true);
    const params = new URLSearchParams({ checkIn, checkOut, guests: String(guests) });
    router.push(`/book/${listingId}/confirmed?${params.toString()}`);
  }

  return (
    <form onSubmit={askFirst}>
      <Panel title="Who is staying">
        <div className="field-row">
          <label className="field">
            <span className="field__label">Full name</span>
            <input className="field__input" value={name} required
              onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="field">
            <span className="field__label">Phone number</span>
            <input className="field__input" type="tel" value={phone} required
              placeholder="10 digits" onChange={(e) => setPhone(e.target.value)} />
          </label>
        </div>
        <p className="book__fineprint">
          Your host sees your name, never your phone number. Messages go through
          ApnaSafar.
        </p>
      </Panel>

      <Panel title="How you are paying">
        <label className="field">
          <span className="field__label">Card number</span>
          <input className="field__input" inputMode="numeric" placeholder="0000 0000 0000 0000" />
        </label>
        <div className="field-row book__card-row">
          <label className="field">
            <span className="field__label">Expires</span>
            <input className="field__input" placeholder="MM / YY" />
          </label>
          <label className="field">
            <span className="field__label">Security code</span>
            <input className="field__input" inputMode="numeric" placeholder="123" />
          </label>
        </div>
        <p className="book__fineprint">
          Card details are handled by the payment provider and never stored by us.
        </p>
      </Panel>

      {/* CONFIRM — the amount is repeated on the button itself so
          nobody can pay without having seen the number. */}
      <div className="book__confirm">
        <button className="button button--primary button--large button--full"
          type="submit" disabled={!ready || submitting}>
          {submitting ? "Confirming…" : `Confirm and pay ${rupees(total)}`}
        </button>
        {!ready && (
          <p className="book__fineprint">
            Add a name and phone number to continue.
          </p>
        )}
      </div>

      {/* ASK FIRST — the amount and the dates are repeated here,
          so the last thing seen before paying is what is paid. */}
      <Modal
        open={asking}
        onClose={() => setAsking(false)}
        title={`Pay ${rupees(total)}?`}
        closeOnBackdrop={false}
        footer={
          <>
            <button type="button" className="button button--ghost"
              onClick={() => setAsking(false)}>Go back</button>
            <button type="button" className="button button--primary"
              onClick={pay}>Yes, pay {rupees(total)}</button>
          </>
        }
      >
        <p>
          Your card is charged the full {rupees(total)} now, not at check-in.
          The booking is confirmed straight away and appears in My trips.
        </p>
      </Modal>
    </form>
  );
}
