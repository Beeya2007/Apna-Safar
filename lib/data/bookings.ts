/* ============================================================
   BOOKINGS, WISHLISTS AND MESSAGES — the signed-in guest's own
   things. Safe to edit freely. Placeholder content.
   ------------------------------------------------------------
   Prices are NOT written out by hand here. Each booking calls
   priceStay(), the same function the listing and payment pages
   use, so the three can never disagree with each other.
   ============================================================ */

import type { Booking, Conversation, Wishlist } from "../types";
import { priceStay } from "../format";
import { listingById } from "./listings";

/* One row per booking: which listing, which dates, what state. */
const RAW = [
  { id: "b1", listingId: "1", checkIn: "2026-11-12", checkOut: "2026-11-17", guests: 4, status: "upcoming",  bookedOn: "2026-09-02" },
  { id: "b2", listingId: "4", checkIn: "2027-01-08", checkOut: "2027-01-12", guests: 2, status: "upcoming",  bookedOn: "2026-09-18" },
  { id: "b3", listingId: "3", checkIn: "2026-06-04", checkOut: "2026-06-08", guests: 4, status: "completed", bookedOn: "2026-04-11" },
  { id: "b4", listingId: "5", checkIn: "2026-03-20", checkOut: "2026-03-23", guests: 3, status: "completed", bookedOn: "2026-02-01" },
  { id: "b5", listingId: "6", checkIn: "2026-08-14", checkOut: "2026-08-17", guests: 2, status: "cancelled", bookedOn: "2026-07-03" },
] as const;

export const BOOKINGS: Booking[] = RAW.map((b) => {
  const listing = listingById(b.listingId)!;
  return {
    id: b.id,
    listingId: b.listingId,
    checkIn: b.checkIn,
    checkOut: b.checkOut,
    guests: b.guests,
    status: b.status,
    price: priceStay(listing, b.checkIn, b.checkOut),
    bookedOn: b.bookedOn,
    checkInFrom: "14:00",
    checkOutBy: "11:00",
  };
});

export function bookingById(id: string): Booking | undefined {
  return BOOKINGS.find((b) => b.id === id);
}

export function bookingsByStatus(status: Booking["status"]): Booking[] {
  return BOOKINGS.filter((b) => b.status === status);
}

/* --- WISHLISTS ---------------------------------------------- */
export const WISHLISTS: Wishlist[] = [
  { id: "w1", name: "Monsoon trip",     listingIds: ["3", "5", "7"] },
  { id: "w2", name: "Somewhere cold",   listingIds: ["2", "8"] },
  { id: "w3", name: "Long weekend",     listingIds: ["1", "7", "5", "4"] },
];

export function wishlistById(id: string): Wishlist | undefined {
  return WISHLISTS.find((w) => w.id === id);
}

/* --- CONVERSATIONS ------------------------------------------ */
export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1", listingId: "1", hostId: "h1", unread: true,
    messages: [
      { id: "m1", from: "guest", sentAt: "2026-09-02T10:14", text: "Hi Priya — we land at 9pm on the 12th. Is that too late to check in?" },
      { id: "m2", from: "host",  sentAt: "2026-09-02T10:41", text: "Not at all, I'll leave the gate open and the lights on. Message me when you land." },
      { id: "m3", from: "host",  sentAt: "2026-09-20T08:02", text: "Quick note — the road at the end of the lane is being resurfaced that week. Come in from the market side." },
    ],
  },
  {
    id: "c2", listingId: "4", hostId: "h4", unread: false,
    messages: [
      { id: "m4", from: "guest", sentAt: "2026-09-18T16:30", text: "Booked for January. Is the courtyard covered if it rains?" },
      { id: "m5", from: "host",  sentAt: "2026-09-18T17:05", text: "Half of it is. January is dry here in any case." },
    ],
  },
  {
    id: "c3", listingId: "3", hostId: "h3", unread: false,
    messages: [
      { id: "m6", from: "guest", sentAt: "2026-06-09T09:00", text: "Thank you — the crew were wonderful. Left you a review." },
      { id: "m7", from: "host",  sentAt: "2026-06-09T12:20", text: "Much appreciated. Come back in the monsoon, it is a different place." },
    ],
  },
];

export function conversationById(id: string): Conversation | undefined {
  return CONVERSATIONS.find((c) => c.id === id);
}
