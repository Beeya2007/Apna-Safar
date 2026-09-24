/* ============================================================
   PHOTO SEARCHES — the words used to find each photo.
   ------------------------------------------------------------
   Safe to edit. Change the words for anything whose photo
   looks wrong, then run scripts/fetch-photos.mjs again.
   ============================================================ */

/* ------------------------------------------------------------
   LISTING SEARCHES — one per listing. Safe to edit.
   If a listing's photos look wrong, change its words and run
   the script again. The id must match lib/data/listings.ts.
   ------------------------------------------------------------ */
export const LISTING_SEARCHES = [
  { id: "1", query: "goa beach villa" },
  { id: "2", query: "wooden cabin mountains snow" },
  { id: "3", query: "kerala houseboat backwaters" },
  { id: "4", query: "udaipur haveli courtyard" },
  { id: "5", query: "coffee plantation cottage" },
  { id: "6", query: "rishikesh ganges river" },
  { id: "7", query: "pondicherry colonial street" },
  { id: "8", query: "cabin forest hills fog" },
];

/* ------------------------------------------------------------
   DESTINATION SEARCHES — one per destination. Safe to edit.
   The slug must match lib/data/content.ts.
   ------------------------------------------------------------ */
export const DESTINATION_SEARCHES = [
  { slug: "goa",         query: "goa beach palm trees" },
  { slug: "manali",      query: "manali mountains" },
  { slug: "kerala",      query: "kerala backwaters" },
  { slug: "udaipur",     query: "udaipur lake palace" },
  { slug: "coorg",       query: "coorg hills green" },
  { slug: "rishikesh",   query: "rishikesh bridge river" },
  { slug: "pondicherry", query: "pondicherry street" },
  { slug: "shillong",    query: "meghalaya hills" },
];

/* ------------------------------------------------------------
   EXPERIENCE SEARCHES — one per experience. Safe to edit.
   The id must match EXPERIENCES in lib/data/content.ts.
   ------------------------------------------------------------ */
export const EXPERIENCE_SEARCHES = [
  { id: "e1", query: "fish market india" },
  { id: "e2", query: "coffee beans roasting" },
  { id: "e3", query: "indian cooking spices" },
  { id: "e4", query: "canoe kerala canal" },
  { id: "e5", query: "waterfall meghalaya" },
  { id: "e6", query: "ganga aarti" },
];

/* ------------------------------------------------------------
   PEOPLE SEARCHES — a portrait for each host and reviewer.
   Safe to edit. "h" ids are hosts, "r" ids are reviews — they
   must match lib/data/people.ts. If two people would get the
   same photo, the second one gets the next result instead.
   ------------------------------------------------------------ */
export const PEOPLE_SEARCHES = [
  { id: "h1",  query: "indian woman portrait" },
  { id: "h2",  query: "bearded man portrait mountains" },
  { id: "h3",  query: "indian man headshot" },
  { id: "h4",  query: "elderly indian woman portrait" },
  { id: "h5",  query: "young indian person portrait" },
  { id: "h6",  query: "blonde person portrait" },
  { id: "r1",  query: "young indian person portrait" },
  { id: "r2",  query: "indian woman portrait" },
  { id: "r3",  query: "indian man portrait" },
  { id: "r4",  query: "indian woman portrait smiling" },
  { id: "r5",  query: "bearded indian man portrait" },
  { id: "r6",  query: "indian woman portrait" },
  { id: "r7",  query: "indian man portrait smiling" },
  { id: "r8",  query: "indian woman portrait" },
  { id: "r9",  query: "young indian person portrait" },
  { id: "r10", query: "blonde person headshot" },
  { id: "r11", query: "indian man portrait" },
  { id: "r12", query: "woman portrait smiling" },
];
