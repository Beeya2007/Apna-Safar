/* ============================================================
   REFUND — what a guest gets back if they cancel right now.
   ------------------------------------------------------------
   THE ONE PLACE this is worked out. The cancel screen shows the
   number before anything is confirmed, so nobody cancels and
   then discovers the amount afterwards.

   The rule per policy, counted in whole days before check-in:

     flexible   full refund up to 1 day before
     moderate   full refund up to 5 days before
     strict     full refund only within 48 hours of booking

   Inside the window the guest gets everything except the
   service fee, which is never returned. Outside it, nothing.
   ============================================================ */

import type { Booking, CancellationPolicy } from "./types";

const FREE_UNTIL_DAYS: Record<CancellationPolicy, number> = {
  flexible: 1,
  moderate: 5,
  strict: 0,
};

export type Refund = {
  amount: number;        // whole rupees
  isFull: boolean;
  explanation: string;
};

export function refundFor(
  booking: Booking,
  policy: CancellationPolicy,
  today: Date = new Date(),
): Refund {
  const daysToCheckIn = Math.ceil(
    (new Date(booking.checkIn).getTime() - today.getTime()) / 86_400_000,
  );
  const cutoff = FREE_UNTIL_DAYS[policy];
  const inWindow = daysToCheckIn >= cutoff && cutoff > 0;

  /* Strict is the awkward one: it depends on when the booking
     was made, not on when check-in is. */
  const bookedDaysAgo = Math.floor(
    (today.getTime() - new Date(booking.bookedOn).getTime()) / 86_400_000,
  );
  const strictInWindow = policy === "strict" && bookedDaysAgo <= 2;

  if (inWindow || strictInWindow) {
    return {
      amount: booking.price.total - booking.price.serviceFee,
      isFull: true,
      explanation:
        "You are inside the free-cancellation window, so everything except the service fee comes back.",
    };
  }

  return {
    amount: 0,
    isFull: false,
    explanation:
      policy === "strict"
        ? "The 48-hour window after booking has passed, so this booking is non-refundable."
        : `Free cancellation ended ${cutoff} ${cutoff === 1 ? "day" : "days"} before check-in, so this booking is non-refundable.`,
  };
}
