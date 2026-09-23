/* ============================================================
   FORMAT — turns stored data into the text people read.
   ------------------------------------------------------------
   Storage and display are deliberately different jobs. A price
   is stored as the number 4200 and shown as "₹4,200". A date is
   stored as "2026-11-12" and shown as "12 Nov".

   Every screen uses these. Change the wording here once and it
   changes everywhere.
   ============================================================ */

import type { CancellationPolicy, Listing, PriceBreakdown } from "./types";

/* --- MONEY -------------------------------------------------
   Whole rupees, with Indian digit grouping (1,20,000 not
   120,000). Never shows paise, because we never store them. */
export function rupees(amount: number): string {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

/* --- DATES -------------------------------------------------
   "2026-11-12" → "12 Nov". Used on cards and summaries. */
export function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

/** "2026-11-12" → "12 November 2026". Used where there is room. */
export function longDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Two dates → "12 – 17 Nov". Drops the repeated month. */
export function dateRange(from: string, to: string): string {
  const a = new Date(from);
  const b = new Date(to);
  const sameMonth = a.getMonth() === b.getMonth();
  const left = sameMonth
    ? a.toLocaleDateString("en-IN", { day: "numeric" })
    : shortDate(from);
  return `${left} – ${shortDate(to)}`;
}

/** How many nights between two dates. Never negative. */
export function nightsBetween(checkIn: string, checkOut: string): number {
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

/* --- DISTANCE ---------------------------------------------- */
export function distance(km: number): string {
  return `${km.toLocaleString("en-IN")} km away`;
}

/* --- PLURALS -----------------------------------------------
   count(2, "guest") → "2 guests". Saves writing the same
   ternary in fifteen components. */
export function count(n: number, noun: string): string {
  return `${n} ${noun}${n === 1 ? "" : "s"}`;
}

/* --- PRICE BREAKDOWN ---------------------------------------
   THE ONE PLACE a stay's total is worked out. Every screen
   that shows a price calls this, so the listing page, the
   payment page and the receipt can never disagree.

   Service fee is 12% of the nights subtotal, tax is 5% of the
   nights subtotal. Both rounded to whole rupees.             */
const SERVICE_FEE_RATE = 0.12;
const TAX_RATE = 0.05;

export function priceStay(
  listing: Listing,
  checkIn: string,
  checkOut: string,
): PriceBreakdown {
  const nights = nightsBetween(checkIn, checkOut);
  const nightsSubtotal = listing.pricePerNight * nights;
  const serviceFee = Math.round(nightsSubtotal * SERVICE_FEE_RATE);
  const taxes = Math.round(nightsSubtotal * TAX_RATE);

  return {
    nights,
    pricePerNight: listing.pricePerNight,
    nightsSubtotal,
    cleaningFee: listing.cleaningFee,
    serviceFee,
    taxes,
    total: nightsSubtotal + listing.cleaningFee + serviceFee + taxes,
  };
}

/* --- CANCELLATION -------------------------------------------
   The policy is stored as one word and shown as a sentence. */
export const CANCELLATION_TEXT: Record<CancellationPolicy, string> = {
  flexible: "Free cancellation up to 24 hours before check-in.",
  moderate: "Free cancellation up to 5 days before check-in.",
  strict: "Free cancellation within 48 hours of booking, and no later.",
};
