/* ============================================================
   FETCH PHOTOS — downloads matching photos from Pexels.
   ------------------------------------------------------------
   Run it by hand, not on every page load:

     node --env-file=.env.local scripts/fetch-photos.mjs

   It saves:
   - 5 photos per listing  → public/images/listings/<id>-<n>.jpg
   - 1 banner per destination → public/images/destinations/<slug>.jpg
   - who took each one     → lib/data/photo-credits.ts

   The API key lives in .env.local (never committed).
   ============================================================ */

import { mkdir, writeFile } from "node:fs/promises";

/* ------------------------------------------------------------
   LISTING SEARCHES — one per listing. Safe to edit.
   If a listing's photos look wrong, change its words and run
   the script again. The id must match lib/data/listings.ts.
   ------------------------------------------------------------ */
const LISTING_SEARCHES = [
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
const DESTINATION_SEARCHES = [
  { slug: "goa",         query: "goa beach palm trees" },
  { slug: "manali",      query: "manali mountains" },
  { slug: "kerala",      query: "kerala backwaters" },
  { slug: "udaipur",     query: "udaipur lake palace" },
  { slug: "coorg",       query: "coorg hills green" },
  { slug: "rishikesh",   query: "rishikesh bridge river" },
  { slug: "pondicherry", query: "pondicherry street" },
  { slug: "shillong",    query: "meghalaya hills" },
];

const PHOTOS_PER_LISTING = 5;
const CREDITS_FILE = "lib/data/photo-credits.ts";

const key = process.env.PEXELS_API_KEY;
if (!key) {
  console.error("No PEXELS_API_KEY found. Put it in .env.local and run with --env-file=.env.local");
  process.exit(1);
}

/* Ask Pexels for photos, save each one, return the credits. */
async function fetchAndSave(query, count, size, fileFor) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
  const response = await fetch(url, { headers: { Authorization: key } });
  if (!response.ok) throw new Error(`Pexels said ${response.status} for "${query}"`);
  const { photos } = await response.json();

  const credits = [];
  for (const [index, photo] of photos.entries()) {
    const image = await fetch(photo.src[size]);
    await writeFile(fileFor(index), Buffer.from(await image.arrayBuffer()));
    credits.push({ photographer: photo.photographer.trim(), profile: photo.photographer_url, source: photo.url });
  }
  console.log(`${photos.length} photo(s) for "${query}"`);
  return credits;
}

const credits = { listings: {}, destinations: {} };

await mkdir("public/images/listings", { recursive: true });
for (const { id, query } of LISTING_SEARCHES) {
  credits.listings[id] = await fetchAndSave(query, PHOTOS_PER_LISTING, "large",
    (i) => `public/images/listings/${id}-${i + 1}.jpg`);
}

/* Banners are full-width, so they use the bigger size. */
await mkdir("public/images/destinations", { recursive: true });
for (const { slug, query } of DESTINATION_SEARCHES) {
  const [credit] = await fetchAndSave(query, 1, "large2x",
    () => `public/images/destinations/${slug}.jpg`);
  credits.destinations[slug] = credit;
}

await writeFile(CREDITS_FILE, `/* ============================================================
   PHOTO CREDITS — who took each photo. All are from Pexels.
   ------------------------------------------------------------
   Written by scripts/fetch-photos.mjs. Don't edit by hand;
   re-run the script instead.
   ============================================================ */

import type { PhotoCredit } from "../types";

export const PHOTO_CREDITS: {
  listings: Record<string, PhotoCredit[]>;
  destinations: Record<string, PhotoCredit>;
} = ${JSON.stringify(credits, null, 2)};
`);
console.log(`Credits written to ${CREDITS_FILE}`);
