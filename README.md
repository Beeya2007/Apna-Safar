# ApnaSafar

A stays marketplace — hosts list properties, guests search and book.

**New here? Read in this order:**

1. This file — how to run it
2. [GUIDELINES.md](GUIDELINES.md) — the rules the project follows
3. [docs/01-where-things-live.md](docs/01-where-things-live.md) — which file to open
4. [docs/02-how-to-edit-styles.md](docs/02-how-to-edit-styles.md) — changing the look yourself
5. [docs/03-glossary.md](docs/03-glossary.md) — any word you don't recognise

---

## Running it

```bash
npm run dev
```

Open http://localhost:3000. Edit any file and the browser updates by itself.

---

## What's built so far

| Screen           | Address        | Status                       |
|------------------|----------------|------------------------------|
| Home             | `/`            | ✅ Built, using sample data  |
| Search results   | `/search`      | ⬜ Placeholder               |
| Listing detail   | `/listing/[id]`| ⬜ Placeholder               |
| My trips         | `/trips`       | ⬜ Placeholder               |

Photos are coloured placeholder shapes in `public/images/`. Replace them with
real images using the same filenames.

---

## The folders

```
app/          the pages       — folder name = web address
components/   the sections    — one file per block on screen
styles/       the look        — all colours, sizes, spacing
lib/          the data        — sample listings and their shape
docs/         the manual      — read these
public/       images
```

---

## The stack

| Layer     | Choice                | Why                                          |
|-----------|-----------------------|----------------------------------------------|
| Framework | Next.js 15 (App Router) | Pages render on the server — good for SEO  |
| Language  | TypeScript            | Catches mistakes before the page loads       |
| Styling   | Plain CSS files       | Readable and editable without learning a tool |
| Database  | Supabase (Postgres)   | *Not connected yet*                          |
| Payments  | Razorpay              | *Not connected yet*                          |
| Mobile    | Expo (React Native)   | *Later — shares the TypeScript code*         |

**No Tailwind, deliberately.** Tailwind puts styling inline as
`class="flex px-4 text-sm"`, which is unreadable if you know CSS but not
Tailwind. This project keeps styles in named `.css` files instead.

---

## What's next

1. Connect Supabase — real listings, auth, bookings
2. Build the search page — filters and map
3. Build the listing detail page — gallery, calendar, booking panel
4. Wire up Razorpay — order creation, signature verification, webhooks
5. Add the Expo mobile app
