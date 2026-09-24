/* ============================================================
   FETCH PHOTOS — downloads matching photos from Pexels.
   ------------------------------------------------------------
   Run it by hand, not on every page load:

     node --env-file=.env.local scripts/fetch-photos.mjs

   To redo just one kind, name it at the end — the others keep
   the photos they already have:

     node --env-file=.env.local scripts/fetch-photos.mjs experiences

   It saves:
   - 5 photos per listing  → public/images/listings/<id>-<n>.jpg
   - 1 banner per destination → public/images/destinations/<slug>.jpg
   - 1 photo per experience   → public/images/experiences/<id>.jpg
   - 1 portrait per person    → public/images/people/<id>.jpg
   - who took each one     → lib/data/photo-credits.ts

   The search words live in scripts/photo-searches.mjs.
   The API key lives in .env.local (never committed).
   ============================================================ */

import { mkdir, readFile, writeFile } from "node:fs/promises";

import {
  LISTING_SEARCHES, DESTINATION_SEARCHES, EXPERIENCE_SEARCHES, PEOPLE_SEARCHES,
} from "./photo-searches.mjs";

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

/* Start from the credits already saved, so running one kind
   doesn't wipe the others. */
let credits = { listings: {}, destinations: {}, experiences: {}, people: {} };
try {
  const saved = await readFile(CREDITS_FILE, "utf8");
  credits = { ...credits, ...JSON.parse(saved.slice(saved.indexOf("} = ") + 4, saved.lastIndexOf(";"))) };
} catch {}

const only = process.argv[2];   // "listings", "destinations", "experiences", "people" or nothing
const wanted = (kind) => !only || only === kind;

if (wanted("listings")) await mkdir("public/images/listings", { recursive: true });
for (const { id, query } of wanted("listings") ? LISTING_SEARCHES : []) {
  credits.listings[id] = await fetchAndSave(query, PHOTOS_PER_LISTING, "large",
    (i) => `public/images/listings/${id}-${i + 1}.jpg`);
}

/* Banners are full-width, so they use the bigger size. */
if (wanted("destinations")) await mkdir("public/images/destinations", { recursive: true });
for (const { slug, query } of wanted("destinations") ? DESTINATION_SEARCHES : []) {
  const [credit] = await fetchAndSave(query, 1, "large2x",
    () => `public/images/destinations/${slug}.jpg`);
  credits.destinations[slug] = credit;
}

if (wanted("experiences")) await mkdir("public/images/experiences", { recursive: true });
for (const { id, query } of wanted("experiences") ? EXPERIENCE_SEARCHES : []) {
  const [credit] = await fetchAndSave(query, 1, "large",
    () => `public/images/experiences/${id}.jpg`);
  credits.experiences[id] = credit;
}

/* Portraits: a square crop, and never the same face twice. */
if (wanted("people")) await mkdir("public/images/people", { recursive: true });
const usedFaces = new Set();
for (const { id, query } of wanted("people") ? PEOPLE_SEARCHES : []) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=20&orientation=portrait`;
  const response = await fetch(url, { headers: { Authorization: key } });
  if (!response.ok) throw new Error(`Pexels said ${response.status} for "${query}"`);
  const { photos } = await response.json();
  const photo = photos.find((p) => !usedFaces.has(p.id));
  if (!photo) { console.log(`No unused portrait for "${query}" — skipped ${id}`); continue; }
  usedFaces.add(photo.id);
  const image = await fetch(`${photo.src.original}?auto=compress&cs=tinysrgb&fit=crop&w=240&h=240`);
  await writeFile(`public/images/people/${id}.jpg`, Buffer.from(await image.arrayBuffer()));
  credits.people[id] = { photographer: photo.photographer.trim(), profile: photo.photographer_url, source: photo.url };
  console.log(`Portrait for ${id} ("${query}")`);
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
  experiences: Record<string, PhotoCredit>;
  people: Record<string, PhotoCredit>;
} = ${JSON.stringify(credits, null, 2)};
`);
console.log(`Credits written to ${CREDITS_FILE}`);
