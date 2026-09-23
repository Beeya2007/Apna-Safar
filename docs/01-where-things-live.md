# Where things live

A map of the project. Read this once and you will know which file to open.

---

## The five folders that matter

```
apnasafar/
│
├── app/           📄  THE PAGES — one folder per web address
├── components/    🧩  THE SECTIONS — the blocks pages are built from
├── styles/        🎨  THE LOOK — all colours, sizes, spacing
├── lib/           🗄️  THE DATA — information and its shape
└── public/        🖼️  THE FILES — images, logos, fonts
```

Everything else in the project root is configuration you can ignore.

---

## `app/` — the pages

The folder name **is** the web address.

| Folder                        | Web address          | What it is                   |
|-------------------------------|----------------------|------------------------------|
| `app/page.tsx`                | `/`                  | Home page                    |
| `app/search/`                 | `/search`            | Search results and map       |
| `app/listing/[id]/`           | `/listing/7`         | One property's page          |
| `app/book/[listingId]/`       | `/book/7`            | Review and pay               |
| `app/trips/`                  | `/trips`             | The guest's bookings         |
| `app/wishlists/`              | `/wishlists`         | Saved places                 |
| `app/messages/`               | `/messages`          | Conversations with hosts     |
| `app/account/`                | `/account`           | Profile, payments, alerts    |
| `app/host/`                   | `/host`              | Everything for hosts         |
| `app/experiences/`            | `/experiences`       | Things to do                 |
| `app/destinations/[slug]/`    | `/destinations/goa`  | One city                     |
| `app/help/`, `app/legal/`     | `/help`, `/legal/…`  | Help centre and policies     |
| `app/signin/`, `app/signup/`  | `/signin`            | Getting an account           |
| `app/not-found.tsx`           | *(any dead link)*    | The "page is not here" screen |
| `app/layout.tsx`              | *(every page)*       | Header + footer wrapper      |

The full picture — every screen, what is on it, and what is still pretend —
is in [08-information-architecture.md](08-information-architecture.md).

Square brackets like `[id]` mean "anything can go here". `/listing/7` and
`/listing/abc` both open the same file.

**To add a page**: make a new folder under `app/` with a `page.tsx` inside it.

---

## `components/` — the sections

```
components/
├── home/       sections on the home page
├── search/     sections on the search results page
├── listing/    sections on a property page
├── book/       sections in the review-and-pay flow
├── trips/      sections on the guest's bookings
├── saved/      sections on the wishlist pages
├── messages/   sections on the conversation pages
├── account/    sections on the account pages
├── host/       sections on the host pages
├── browse/     sections on experiences and destinations
├── support/    sections on help and legal pages
├── auth/       the sign-in and sign-up card
└── shared/     things used on more than one page
```

The rule: **if it is used on two or more pages, it moves to `shared/`.**

Current contents:

| File                                  | What it is                          |
|---------------------------------------|-------------------------------------|
| `home/HeroSection.tsx`                | Big photo + headline + search bar   |
| `home/SearchBar.tsx`                  | The Where/When/Who pill             |
| `home/CategoriesSection.tsx`          | Row of property type filters        |
| `home/ListingGridSection.tsx`         | Grid of places to stay              |
| `home/HostCtaSection.tsx`             | "Become a host" banner              |
| `shared/SiteHeader.tsx`               | Top bar on every page               |
| `shared/SiteFooter.tsx`               | Bottom of every page                |
| `shared/Button.tsx`                   | Every button in the app             |
| `shared/ListingCard.tsx`              | One place-to-stay tile              |

---

## `styles/` — the look

```
styles/
├── 01-design-tokens.css   ⭐ START HERE — all colours and sizes
├── 02-base.css               how plain HTML looks by default
├── 03-grid.css               container, 12 columns, section rhythm
│                             (and the four responsive distances)
├── design-system/            the foundations everything else reads
│   ├── 01-color-primitives.css      the raw palette
│   ├── 02-color-semantic-light.css  colours named by job, light
│   ├── 03-color-semantic-dark.css   the same names, dark
│   ├── 04-type-primitives.css       the raw type scale
│   ├── 05-type-semantic.css         type styles named by job
│   ├── 06-type-behavior.css         truncation, clamping, wrapping
│   ├── 07-spacing-primitives.css    the 4px spacing scale
│   ├── 08-radius.css                the five corner values
│   ├── 09-size-primitives.css       the raw size scale
│   ├── 10-size-semantic.css         control heights, icon sizes
│   ├── 11-icon.css                  icon alignment + icon button
│   ├── 12-elevation.css             the five depth levels
│   ├── 13-layer.css                 the z-index scale
│   ├── 14-motion.css                duration, easing, reduced motion
│   └── 15-motion-patterns.css       fade, slide, collapse, loading
├── components/               one file per reusable component
│   ├── button.css
│   ├── header.css
│   ├── footer.css
│   ├── listing-card.css
│   └── search-bar.css
└── pages/                    one file per page
    └── home.css
```

The numbers `01-` and `02-` are there because **load order matters**: tokens must
be defined before anything uses them.

Finding the right file:

- *"I want to change the brand pink"* → `01-design-tokens.css`
- *"I want the hero photo shorter"* → `pages/home.css`, section 1
- *"I want buttons rounder"* → `components/button.css`
- *"There is too much air between sections"* → `03-grid.css`, `--section-gap`
- *"Cards feel cramped"* → the card's own `.css` file, bump it one step
- *"Corners are too round"* → `design-system/08-radius.css`
- *"The shadows are too heavy"* → `design-system/12-elevation.css`
- *"Something is appearing behind something else"* → `design-system/13-layer.css`
- *"The animations are too slow"* → `design-system/14-motion.css`
- *"I need an icon"* → Storybook → Foundations → Iconography, and copy the code

Spacing has its own two pages: [04-spacing.md](04-spacing.md) for the rules and
[05-spacing-in-practice.md](05-spacing-in-practice.md) for the recipes.

---

## `lib/` — the data

| File             | What it is                                              |
|------------------|---------------------------------------------------------|
| `types.ts`       | The *shape* of data — which fields a listing must have   |
| `sample-data.ts` | Fake listings so pages have something to show            |

`sample-data.ts` gets deleted once the real database is connected.

---

## `public/` — the files

Anything here is served at the matching web address:
`public/images/hero.svg` → `/images/hero.svg`

The placeholders currently in `public/images/` are coloured SVG rectangles.
Drop in real photos with the same filenames and they will appear automatically.

---

## How one page fits together

Following the home page from top to bottom:

```
  app/page.tsx                            ← lists the four sections in order
      │
      ├─ components/home/HeroSection.tsx        ← the markup for section 1
      │      └─ styled by styles/pages/home.css, section 1
      │      └─ contains components/home/SearchBar.tsx
      │              └─ styled by styles/components/search-bar.css
      │
      ├─ components/home/CategoriesSection.tsx  ← section 2
      ├─ components/home/ListingGridSection.tsx ← section 3
      │      └─ repeats components/shared/ListingCard.tsx
      │              └─ fed by lib/sample-data.ts
      │
      └─ components/home/HostCtaSection.tsx     ← section 4
```
