/* ============================================================
   SEARCH — turns the web address into a list of listings.
   ------------------------------------------------------------
   Everything the visitor picks lives in the address bar:

     /search?where=goa&guests=4&type=Beachfront&maxPrice=5000

   That means a filtered search can be bookmarked, shared, and
   opened again a week later. Nothing is held in memory.

   THE ONE PLACE filtering happens. If a rule is wrong, it is
   wrong here and nowhere else.
   ============================================================ */

import type { Listing, PropertyType } from "./types";
import { LISTINGS } from "./data/listings";
import { nightsBetween } from "./format";

/** Move an ISO date by a number of days.
    All in UTC on purpose: building the date at local midnight
    and reading it back with toISOString() lands on the day
    before anywhere east of Greenwich. */
function shiftDays(iso: string, by: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + by);
  return d.toISOString().slice(0, 10);
}

/** Does an open window touch the month starting at `anchor`? */
function overlapsMonth(from: string, to: string, anchor: string): boolean {
  const monthStart = anchor.slice(0, 7);
  return from.slice(0, 7) <= monthStart && to.slice(0, 7) >= monthStart;
}

/** The shape of everything that can appear in the address. */
export type SearchQuery = {
  where?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  type?: string;
  maxPrice?: string;
  amenity?: string;
  sort?: string;
  /** Days either side the dates may stretch. "0" or absent is exact. */
  nudge?: string;
  /** Flexible search: how many nights, and which month. */
  nights?: string;
  month?: string;      // "2026-12-01"
};

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "price-low",   label: "Price: low to high" },
  { value: "price-high",  label: "Price: high to low" },
  { value: "rating",      label: "Best rated" },
  { value: "distance",    label: "Nearest first" },
];

/** Price points for the "under ₹x" filter, in whole rupees. */
export const PRICE_STEPS = [3000, 5000, 8000];

export function searchListings(query: SearchQuery): Listing[] {
  let results = [...LISTINGS];

  /* WHERE — matches the place name or the city slug, so both
     "goa" and "Anjuna" find the same listing. */
  if (query.where) {
    const needle = query.where.trim().toLowerCase();
    results = results.filter(
      (l) =>
        l.location.toLowerCase().includes(needle) ||
        l.citySlug.includes(needle) ||
        l.title.toLowerCase().includes(needle),
    );
  }

  /* GUESTS — a place must sleep at least this many. */
  if (query.guests) {
    const wanted = parseInt(query.guests, 10);
    if (!Number.isNaN(wanted)) results = results.filter((l) => l.guests >= wanted);
  }

  /* PROPERTY TYPE — the category row on the home page. */
  if (query.type) {
    results = results.filter((l) => l.propertyType === (query.type as PropertyType));
  }

  /* PRICE — nightly rate only. Fees are not filtered on,
     because the guest is choosing against the headline price. */
  if (query.maxPrice) {
    const cap = parseInt(query.maxPrice, 10);
    if (!Number.isNaN(cap)) results = results.filter((l) => l.pricePerNight <= cap);
  }

  /* AMENITY — one at a time, kept simple on purpose. */
  if (query.amenity) {
    results = results.filter((l) => l.amenities.includes(query.amenity!));
  }

  /* DATES — the placeholder data gives each listing a single
     open window, so a stay must sit inside it. Real
     availability replaces this when the database arrives.

     `nudge` is how many days either side the visitor said they
     could move. It means the SAME stay starting a little earlier
     or later, so it can only ever find more places, never fewer.
     A place qualifies if the stay fits anywhere in that span. */
  if (query.checkIn && query.checkOut) {
    const give = parseInt(query.nudge ?? "0", 10) || 0;
    const nights = nightsBetween(query.checkIn, query.checkOut);
    const starts = Array.from({ length: give * 2 + 1 },
      (_, i) => shiftDays(query.checkIn!, i - give));

    results = results.filter((l) => starts.some(
      (start) => start >= l.availableFrom
              && shiftDays(start, nights) <= l.availableTo,
    ));
  }

  /* FLEXIBLE — no dates, just "this long, roughly then". A place
     qualifies if its open window is long enough and falls in the
     month asked for. */
  if (!query.checkIn && (query.nights || query.month)) {
    const nights = parseInt(query.nights ?? "0", 10) || 0;
    results = results.filter((l) => {
      const windowNights = nightsBetween(l.availableFrom, l.availableTo);
      const longEnough = nights === 0 || windowNights >= nights;
      const rightMonth = !query.month
        || overlapsMonth(l.availableFrom, l.availableTo, query.month);
      return longEnough && rightMonth;
    });
  }

  return sortListings(results, query.sort);
}

function sortListings(listings: Listing[], sort?: string): Listing[] {
  switch (sort) {
    case "price-low":  return [...listings].sort((a, b) => a.pricePerNight - b.pricePerNight);
    case "price-high": return [...listings].sort((a, b) => b.pricePerNight - a.pricePerNight);
    case "rating":     return [...listings].sort((a, b) => b.rating - a.rating);
    case "distance":   return [...listings].sort((a, b) => a.distanceKm - b.distanceKm);
    default:           return listings;
  }
}

/* --- ADDRESS HELPERS ---------------------------------------
   Build a new address from the current one with a single value
   changed. Used by every filter control, so a filter never
   wipes out the filters already applied.                      */
export function withParam(
  query: SearchQuery,
  key: keyof SearchQuery,
  value: string | undefined,
): string {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) if (v) params.set(k, v);
  if (value) params.set(key, value);
  else params.delete(key);
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

/** A plain-English sentence describing the current search. */
export function describeSearch(query: SearchQuery, resultCount: number): string {
  const parts: string[] = [`${resultCount} ${resultCount === 1 ? "stay" : "stays"}`];
  if (query.where) parts.push(`in ${query.where}`);
  if (query.guests) parts.push(`for ${query.guests} guests`);
  return parts.join(" ");
}
