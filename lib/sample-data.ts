/* ============================================================
   SAMPLE DATA — the old single-file home for placeholder data.
   ------------------------------------------------------------
   The data now lives in lib/data/, split by subject so no one
   file gets unreadable:

     lib/data/listings.ts   places to stay, amenity labels
     lib/data/people.ts     hosts and reviews
     lib/data/bookings.ts   bookings, wishlists, messages
     lib/data/content.ts    destinations, experiences, help

   This file stays so that older imports of SAMPLE_LISTINGS keep
   working. New code should import from lib/data/ directly.
   ============================================================ */

export { LISTINGS as SAMPLE_LISTINGS, listingById } from "./data/listings";
