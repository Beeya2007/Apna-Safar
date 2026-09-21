/* ============================================================
   TYPES — the shape of the data used across the app.
   ------------------------------------------------------------
   Think of these as forms: they list exactly which fields a
   piece of data must have. If a field is missing or misspelled
   anywhere in the app, the editor flags it immediately.
   ============================================================ */

/** One place to stay, as shown on a card or a listing page. */
export type Listing = {
  id: string;
  location: string;        // "Goa, India"
  distance: string;        // "580 km away"
  dates: string;           // "12 – 17 Nov"
  pricePerNight: number;   // whole rupees, e.g. 4200
  rating: number;          // 0 to 5, e.g. 4.87
  photo: string;           // path to the image
};
