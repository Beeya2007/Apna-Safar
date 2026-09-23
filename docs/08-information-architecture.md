# Information architecture

Every screen ApnaSafar has, what sits on each one, and what is still pretend
behind it. Every address below is built and renders. The "Where we are today"
section near the bottom says what is real data and what is placeholder.

Nothing here is a design. It is the skeleton: which pages exist, what each
page is for, and which sections it is made of. The look comes from our own
design system — see [02-how-to-edit-styles.md](02-how-to-edit-styles.md).

---

## The four people using this

Every screen below exists to serve one of them. If a screen does not, cut it.

| Who | What they came to do |
|-----|----------------------|
| **Browser** | Wandering. No dates, no city, just looking. |
| **Guest** | Has a trip in mind. Wants to find it, book it, and not worry. |
| **Traveller** | Already booked. Needs the address, the check-in time, the refund rules. |
| **Host** | Has a place. Wants it listed, booked, and paid for. |

---

## The whole map

One row per web address. `[id]` means "anything goes here" — `/listing/7`
and `/listing/abc` open the same file.

### Public — no account needed

| Address | Screen | For |
|---------|--------|-----|
| `/` | Home | Browser |
| `/search` | Search results + map | Browser, Guest |
| `/listing/[id]` | One property | Guest |
| `/experiences` | Experiences home | Browser |
| `/experiences/[id]` | One experience | Guest |
| `/destinations/[slug]` | A city or region | Browser |
| `/help` | Help centre | Everyone |
| `/help/[slug]` | One help article | Everyone |
| `/legal/[slug]` | Terms, privacy, policies | Everyone |

### Booking — the money path

| Address | Screen | For |
|---------|--------|-----|
| `/book/[listingId]` | Review and pay | Guest |
| `/book/[listingId]/confirmed` | Booking confirmed | Guest |

### Guest account — needs sign-in

| Address | Screen | For |
|---------|--------|-----|
| `/trips` | All bookings: upcoming, past, cancelled | Traveller |
| `/trips/[id]` | One booking, with the things you need on the day | Traveller |
| `/trips/[id]/cancel` | Cancel, with the refund shown before you commit | Traveller |
| `/wishlists` | Saved places, in named lists | Browser |
| `/wishlists/[id]` | One list | Browser |
| `/messages` | All conversations | Guest, Traveller |
| `/messages/[id]` | One conversation | Guest, Traveller |
| `/account` | Account home — the hub | Everyone |
| `/account/profile` | Name, photo, about | Everyone |
| `/account/payments` | Cards, refunds, receipts | Guest |
| `/account/notifications` | What we may send, and how | Everyone |

### Host — needs a host account

| Address | Screen | For |
|---------|--------|-----|
| `/host` | Why host — the pitch | Host |
| `/host/dashboard` | Earnings, occupancy, what needs attention | Host |
| `/host/listings` | Their properties | Host |
| `/host/listings/[id]/edit` | Edit one property | Host |
| `/host/listings/new` | Add a property — a multi-step flow | Host |
| `/host/bookings` | Requests and confirmed stays | Host |
| `/host/calendar` | Availability and per-night pricing | Host |
| `/host/earnings` | Payouts and statements | Host |

### Sign in

| Address | Screen |
|---------|--------|
| `/signin` | Phone or email, one code |
| `/signup` | Create an account |

---

## The journeys

Four paths through the map. If a path breaks, the product breaks.

**Find and book**
`/` → `/search` → `/listing/[id]` → `/book/[listingId]` →
`/book/[listingId]/confirmed` → `/trips`

**Wander**
`/` → `/destinations/[slug]` → `/listing/[id]` → saved to `/wishlists`

**Travel day**
`/trips` → `/trips/[id]` → address, directions, house rules, message the host

**Become a host**
`/host` → `/signup` → `/host/listings/new` → `/host/dashboard`

---

## What goes on each screen

Sections top to bottom, in screen order. One section here = one component
file, per rule 1 in [GUIDELINES.md](../GUIDELINES.md).

### `/` — Home *(built)*
1. Hero — headline and search bar
2. Categories — property type filters
3. Listing grid — popular stays
4. Host CTA

Later: a destinations strip, and a "pick up where you left off" row for
people who have searched before.

### `/search` — Search results
1. Search summary bar — city, dates, guests; editable in place
2. Filter bar — price, rooms, property type, amenities; opens a full filter panel
3. Results grid — listing cards, paged
4. Map panel — pins beside the results, side by side on desktop, a toggle on phones
5. Empty state — when nothing matches, say what to loosen

### `/listing/[id]` — One property
1. Title block — name, rating, location, save and share
2. Photo gallery
3. Host and property summary — who hosts it, how many rooms, sleeps how many
4. Description
5. Amenities
6. Booking panel — dates, guests, price breakdown, Reserve. **Sticky on desktop.**
7. Reviews — overall score, category scores, the reviews themselves
8. Location map — neighbourhood, not the exact door
9. House rules, cancellation policy, safety
10. Similar stays

### `/book/[listingId]` — Review and pay
1. Trip summary — dates, guests, the property
2. Price breakdown — nightly rate × nights, fees, taxes, **total in whole rupees**
3. Guest details
4. Payment method
5. Cancellation policy — stated before paying, never after
6. Confirm and pay

### `/trips/[id]` — One booking
1. Status banner — confirmed, cancelled, or awaiting the host
2. Dates and address, with directions
3. Check-in instructions
4. Host contact — message button
5. Price paid and receipt
6. Cancellation — what a refund would be, right now
7. House rules

### `/host/dashboard` — Host home
1. Attention strip — requests to answer, reviews to write, gaps in the calendar
2. Earnings summary — this month, next payout
3. Upcoming stays
4. Listing performance — views, bookings, rating

The remaining screens follow the same shape and are specified when built.

---

## What the data needs

Every type is in `lib/types.ts`, and the placeholder content that fills them
is split by subject under `lib/data/`.

| Type | What it holds | Where the sample data is |
|------|---------------|--------------------------|
| `Listing` | A place to stay, with photos, amenities, rules and policy | `lib/data/listings.ts` |
| `Host` / `Review` | Who owns a place, and what guests said | `lib/data/people.ts` |
| `Booking` / `PriceBreakdown` | A stay, and what it cost line by line | `lib/data/bookings.ts` |
| `Wishlist` | A named set of saved places | `lib/data/bookings.ts` |
| `Conversation` / `Message` | A thread with a host | `lib/data/bookings.ts` |
| `Destination` / `Experience` / `HelpArticle` | Browsing and support content | `lib/data/content.ts` |
| `Payout` | Money sent to a host | `lib/data/host.ts` |

Two standing rules, both from [GUIDELINES.md](../GUIDELINES.md):

- **Money is a whole number of rupees.** `4200`, never `"4200"` and never
  `4200.00`. Display formatting happens in `rupees()` in `lib/format.ts`, so
  nothing stores a formatted string.
- **Dates are ISO strings, not display text.** `"2026-11-12"`, never
  `"12 Nov"`. `dateRange()` and `nightsBetween()` in `lib/format.ts` turn them
  into words and into arithmetic.

---

## Where we are today

Every address in the map above exists and renders. The screens run on
placeholder data from `lib/data/`, and nothing talks to a database or a real
payment provider yet.

| Area | State |
|------|-------|
| `/`, `/search`, `/listing/[id]` | Built. Filtering, sorting and the map panel all work off the address bar |
| `/book`, `/book/confirmed` | Built. Real price arithmetic, no real payment |
| `/trips`, `/trips/[id]`, `/trips/[id]/cancel` | Built. The refund is worked out and shown before confirming |
| `/wishlists`, `/messages`, `/account/*` | Built |
| `/host/*` — all eight screens | Built |
| `/experiences`, `/destinations`, `/help`, `/legal`, `/signin`, `/signup` | Built |

**The four things that are still pretend**, and where each one lives when it
stops being pretend:

| What | The one file to change |
|------|------------------------|
| Listings, hosts, bookings | `lib/data/` — swap the arrays for database calls |
| The map on `/search` | `components/search/MapPanel.tsx` — pins are laid out from card order, not coordinates |
| Taking payment | `components/book/PayForm.tsx` — the submit handler just navigates |
| Signing in | `components/auth/AuthSection.tsx` — the code is never checked |

Three rules are enforced in exactly one place each, so they cannot drift:

- **What a stay costs** — `priceStay()` in `lib/format.ts`. The listing panel,
  the payment page and the receipt all call it.
- **What a cancellation refunds** — `refundFor()` in `lib/refund.ts`.
- **What a search matches** — `searchListings()` in `lib/search.ts`.

## What to build next

The map is complete; the depth behind it is not. In rough order of value:

1. **Real data.** Everything else is blocked behind this. `lib/data/` is shaped
   so the swap is file-by-file rather than screen-by-screen.
2. **Real availability.** Each listing currently has one open window, so
   `/search` can only match dates inside it. Real bookings need a calendar of
   blocked nights per listing.
3. **Real payment**, then **real accounts**. In that order — a booking that
   cannot be paid for is worth less than one that cannot be signed into.
4. **A real map** on `/search` and `/listing/[id]`.
5. **Photo upload** on the host flow, which is currently a drop zone that
   does nothing.
6. **Search depth** — several amenities at once, a price slider rather than
   three steps, and paging once there are more than a screenful of results.
