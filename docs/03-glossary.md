# Glossary

Every piece of jargon in this project, in plain English.

---

## Files and folders

**`.tsx` file** — a page or section. Contains the structure (what's on screen)
and the behaviour (what happens when you click). Mostly looks like HTML.

**`.css` file** — the look. Colours, sizes, spacing, layout.

**`.ts` file** — data and logic only, nothing visual.

**Component** — one reusable block. A button, a card, a whole hero section. If it
has a name you'd say out loud, it's a component.

**Props** — the settings you pass into a component. `<Button variant="primary">`
passes the prop `variant`.

---

## CSS terms used here

**Design token** — a name for a value. `--color-brand` instead of `#FF385C`.
Change it once, it updates everywhere.

**`var(--name)`** — "use the value stored under this name".

**Class** — the label connecting markup to styles. `className="hero"` in the
`.tsx` matches `.hero` in the `.css`.

**BEM** — the naming convention:
`block__element--variant` → `hero__title`, `button--primary`.
`__` means "part of", `--` means "version of".

**Media query** — a block of styles that only applies at certain screen widths.
`@media (max-width: 640px) { }` = "phones only".

**Flexbox** (`display: flex`) — arranges things in a row or column. Good for
toolbars, headers, anything in a line.

**Grid** (`display: grid`) — arranges things in rows *and* columns. Good for the
listing grid.

**`rem`** — a size relative to the base font size. `1rem` = 16px by default.
Scales when someone increases their browser text size, so it's more accessible
than fixed pixels.

**`clamp(min, ideal, max)`** — a size that grows with the screen but never goes
past the limits. Used for the hero headline so it's big on desktop and still
fits on a phone.

**`z-index`** — which thing sits on top when two overlap. Higher wins.

---

## Next.js / React terms

**Next.js** — the framework. Handles pages, routing, and rendering.

**App Router** — the system where folder names become web addresses.

**`layout.tsx`** — the wrapper shown on every page (header, footer).

**`page.tsx`** — one actual screen.

**`"use client"`** — a line at the top of a file meaning "this needs to run in
the browser". Required for anything with typing, clicking, or state.

**State** — a value that changes while the page is open, like what someone has
typed into the search box.

**Hydration** — the page arrives as plain HTML, then JavaScript wakes it up.
A "hydration error" means the server and browser disagreed about what to show.

---

## Booking / travel terms

**Listing** — one property a host has put up.

**Inventory** — which dates a listing is actually available.

**Instant Book** — guest books without host approval.

**Request to Book** — host must accept first.

**Hold** — dates temporarily reserved while payment completes, released if it
doesn't. Prevents two people booking the same night.

**Payout** — money released to the host, usually after check-in.

**Double-blind reviews** — both sides write reviews, neither sees the other's
until both are in.

---

## Payment terms (Razorpay)

**Order** — created on our server before checkout opens. Fixes the amount so the
browser can't change the price.

**Payment ID** — Razorpay's reference for one attempt.

**Signature verification** — a cryptographic check that a payment result really
came from Razorpay and wasn't faked. **Never skip this.**

**Webhook** — Razorpay calling our server directly to confirm a payment. More
reliable than the browser, because browsers get closed mid-payment.

**Idempotent** — safe to run twice. Webhooks get retried, so the handler must not
create two bookings from one payment.

**Paise** — 1/100 of a rupee. Razorpay takes amounts in paise, so ₹4,200 is sent
as `420000`.
