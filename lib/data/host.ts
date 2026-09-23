/* ============================================================
   HOSTING — the signed-in host's own side of the marketplace.
   ------------------------------------------------------------
   Safe to edit freely. Placeholder content.

   Everything here belongs to ONE pretend host so the screens
   have something to show. When accounts are real, these become
   "the listings owned by whoever is signed in".

   Money is WHOLE RUPEES throughout.
   ============================================================ */

import { nightsBetween } from "../format";
import { LISTINGS } from "./listings";
import { BOOKINGS } from "./bookings";

/** The host we are signed in as. */
export const MY_HOST_ID = "h1";

/** Which listings they own. */
export const MY_LISTING_IDS = ["1", "7"];

export function myListings() {
  return LISTINGS.filter((l) => MY_LISTING_IDS.includes(l.id));
}

/** Bookings against any of their listings. */
export function myBookings() {
  return BOOKINGS.filter((b) => MY_LISTING_IDS.includes(b.listingId));
}

/** How a listing is doing. Placeholder figures. */
export const LISTING_STATS: Record<string, { views: number; bookings: number; published: boolean }> = {
  "1": { views: 1840, bookings: 12, published: true },
  "7": { views: 960,  bookings: 7,  published: false },
};

/** Money sent to the host's bank. */
export type Payout = {
  id: string;
  date: string;        // ISO date
  listingId: string;
  gross: number;       // whole rupees
  hostFee: number;     // whole rupees, what we keep
  net: number;         // whole rupees, what lands
  status: "paid" | "scheduled";
};

export const PAYOUTS: Payout[] = [
  { id: "p1", date: "2026-09-20", listingId: "1", gross: 21000, hostFee: 630, net: 20370, status: "paid" },
  { id: "p2", date: "2026-08-14", listingId: "7", gross: 24500, hostFee: 735, net: 23765, status: "paid" },
  { id: "p3", date: "2026-07-30", listingId: "1", gross: 16800, hostFee: 504, net: 16296, status: "paid" },
  { id: "p4", date: "2026-11-13", listingId: "1", gross: 21000, hostFee: 630, net: 20370, status: "scheduled" },
];

/** The things asking for the host's attention right now. */
export const HOST_TASKS = [
  { icon: "✉️", text: "Priya asked about early check-in on 12 Nov", href: "/messages" },
  { icon: "📅", text: "Nine nights open in December on the Goa villa", href: "/host/calendar" },
  { icon: "📷", text: "The Pondicherry townhouse is not published yet", href: "/host/listings" },
];

export function totalEarned(): number {
  return PAYOUTS.filter((p) => p.status === "paid").reduce((sum, p) => sum + p.net, 0);
}

export function nextPayout(): Payout | undefined {
  return PAYOUTS.find((p) => p.status === "scheduled");
}

/* --- WHICH NIGHTS ARE TAKEN ---------------------------------
   Expands each booking into the individual nights it occupies,
   so the calendar can tint them. Checkout day is NOT a night —
   a 12th-to-17th booking takes four nights, not five, and the
   17th is free for the next guest to arrive.                  */
export function bookedNights(): Record<string, string[]> {
  const out: Record<string, string[]> = {};

  for (const booking of myBookings()) {
    if (booking.status === "cancelled") continue;

    const nights = nightsBetween(booking.checkIn, booking.checkOut);
    const start = new Date(booking.checkIn);
    const dates: string[] = [];

    for (let i = 0; i < nights; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      dates.push(
        `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`,
      );
    }
    out[booking.listingId] = [...(out[booking.listingId] ?? []), ...dates];
  }

  return out;
}
