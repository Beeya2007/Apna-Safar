/* ============================================================
   TYPES — the shape of the data used across the app.
   ------------------------------------------------------------
   Think of these as forms: they list exactly which fields a
   piece of data must have. If a field is missing or misspelled
   anywhere in the app, the editor flags it immediately.

   TWO RULES THAT NEVER BEND:
   1. Money is a WHOLE NUMBER OF RUPEES.  4200, never "4200"
      and never 4200.00.
   2. Dates are ISO strings — "2026-11-12". Never "12 Nov".
      The display text is worked out by lib/format.ts.
   ============================================================ */

/** One place to stay. */
export type Listing = {
  id: string;
  title: string;           // "Sea-facing villa with a private deck"
  location: string;        // "Anjuna, Goa"
  citySlug: string;        // "goa" — links to /destinations/goa
  propertyType: PropertyType;
  distanceKm: number;      // 580
  availableFrom: string;   // ISO date
  availableTo: string;     // ISO date
  pricePerNight: number;   // whole rupees
  cleaningFee: number;     // whole rupees
  rating: number;          // 0 to 5, e.g. 4.87
  reviewCount: number;
  photos: string[];        // first one is the cover
  hostId: string;
  guests: number;          // how many people it sleeps
  bedrooms: number;
  beds: number;
  bathrooms: number;
  description: string;
  amenities: string[];     // must match a label in AMENITIES
  houseRules: string[];
  cancellation: CancellationPolicy;
  neighbourhood: string;   // described, never an exact address
};

export type PropertyType =
  | "Beachfront" | "Mountains" | "City" | "Countryside"
  | "Pools" | "Heritage" | "Cabins" | "Islands";

export type CancellationPolicy = "flexible" | "moderate" | "strict";

/** The person who owns a listing. */
export type Host = {
  id: string;
  name: string;
  avatar: string;          // emoji, until real photos exist
  joinedYear: number;
  responseRate: number;    // percent, 0 to 100
  isVerified: boolean;
  about: string;
};

/** One guest review on one listing. */
export type Review = {
  id: string;
  listingId: string;
  author: string;
  avatar: string;
  date: string;            // ISO date
  rating: number;
  text: string;
};

/** What a stay costs, broken into the lines a guest sees.
    Every number here is whole rupees. */
export type PriceBreakdown = {
  nights: number;
  pricePerNight: number;
  nightsSubtotal: number;  // pricePerNight × nights
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  total: number;
};

export type BookingStatus = "upcoming" | "completed" | "cancelled" | "pending";

/** One confirmed (or cancelled) stay. */
export type Booking = {
  id: string;
  listingId: string;
  checkIn: string;         // ISO date
  checkOut: string;        // ISO date
  guests: number;
  status: BookingStatus;
  price: PriceBreakdown;
  bookedOn: string;        // ISO date
  checkInFrom: string;     // "14:00"
  checkOutBy: string;      // "11:00"
};

/** A named collection of saved listings. */
export type Wishlist = {
  id: string;
  name: string;
  listingIds: string[];
};

/** One message inside a conversation. */
export type Message = {
  id: string;
  from: "guest" | "host";
  sentAt: string;          // ISO date-time
  text: string;
};

/** A thread between a guest and one host about one listing. */
export type Conversation = {
  id: string;
  listingId: string;
  hostId: string;
  unread: boolean;
  messages: Message[];
};

/** Who took a photo, so they can be credited under it. */
export type PhotoCredit = {
  photographer: string;    // "Rohit George"
  profile: string;         // their Pexels page
  source: string;          // the photo's Pexels page
};

/** A city or region with its own landing page. */
export type Destination = {
  slug: string;            // "goa"
  name: string;            // "Goa"
  tagline: string;
  emoji: string;
  photo: string;           // "/images/destinations/goa.jpg" — the banner
  listingCount: number;
  /* Where the place actually is, so "near me" can be worked
     out in the browser without asking a mapping service. */
  lat: number;             // 15.4909
  lng: number;             // 73.8278
};

/** A bookable thing to do, as opposed to a place to sleep. */
export type Experience = {
  id: string;
  title: string;
  location: string;
  emoji: string;
  photo: string;           // "/images/experiences/e1.jpg"
  durationHours: number;
  pricePerPerson: number;  // whole rupees
  rating: number;
  reviewCount: number;
  description: string;
};

/** One help-centre article. */
export type HelpArticle = {
  slug: string;
  category: string;
  title: string;
  body: string[];          // one string per paragraph
};
