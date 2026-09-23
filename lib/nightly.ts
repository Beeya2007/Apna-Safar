/* ============================================================
   NIGHTLY — what a date typically costs, and whether that is
   cheap or dear.
   ------------------------------------------------------------
   THE ONE PLACE the calendar's colours are decided.

   No prices are invented here. A date's average is the mean
   nightly price of the places that are actually free that
   night, taken from lib/data/listings.ts. A date with nothing
   free has no average and gets no colour — an honest blank
   rather than a guess.

   "Cheap" and "dear" are relative to the typical night across
   every listing, with a band in the middle that counts as
   neither. Without the band almost every date would be tinted
   one way or the other and the colour would stop meaning
   anything.
   ============================================================ */

import { LISTINGS } from "./data/listings";

/** How far from typical a date must be before it takes colour. */
const BAND = 0.1;                    // 10% either side

export type PriceTone = "lower" | "higher" | undefined;

/** The mean nightly price of everything free on this date. */
export function nightlyAverage(iso: string): number | undefined {
  const free = LISTINGS.filter(
    (l) => iso >= l.availableFrom && iso <= l.availableTo,
  );
  if (free.length === 0) return undefined;

  const total = free.reduce((sum, l) => sum + l.pricePerNight, 0);
  return Math.round(total / free.length);
}

/** A typical night anywhere — the middle of every listing price. */
export const typicalNightly: number = median(
  LISTINGS.map((l) => l.pricePerNight),
);

/** Cheap, dear, or neither, for one date. */
export function priceTone(iso: string): PriceTone {
  const average = nightlyAverage(iso);
  if (average === undefined) return undefined;

  if (average < typicalNightly * (1 - BAND)) return "lower";
  if (average > typicalNightly * (1 + BAND)) return "higher";
  return undefined;
}

function median(numbers: number[]): number {
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : Math.round((sorted[middle - 1] + sorted[middle]) / 2);
}
