# Project Guidelines

**This file is the rulebook.** Claude reads it at the start of every session and
follows it. You can read it too — it is written in plain English on purpose.

If you want to change how the project is built, change this file. It is the one
place where the rules live.

---

## The one-sentence goal

> Every file should be findable by someone who knows what the screen looks like
> but not how the code works.

---

## Rule 1 — One section on screen = one file

If you can point at a block on the page and name it ("that's the hero", "that's
the reviews"), it gets its own file.

```
Home page on screen              →  Files on disk
─────────────────────────────────────────────────────────────
┌───────────────────────────┐
│  HERO                     │    →  components/home/HeroSection.tsx
├───────────────────────────┤
│  CATEGORIES               │    →  components/home/CategoriesSection.tsx
├───────────────────────────┤
│  LISTING GRID             │    →  components/home/ListingGridSection.tsx
├───────────────────────────┤
│  HOST CTA                 │    →  components/home/HostCtaSection.tsx
└───────────────────────────┘
```

The page file itself (`app/page.tsx`) is then just a list of those sections in
order. To move a section up the page, move its line up.

---

## Rule 2 — Styling lives in `.css` files, never inline

**Do this** — a readable class name, styles in a CSS file:

```tsx
<section className="hero">
```
```css
.hero { min-height: 560px; background-size: cover; }
```

**Never do this** — utility classes crammed into the markup:

```tsx
<section className="min-h-[560px] bg-cover flex items-center px-4 md:px-8">
```

The second version is what Tailwind produces. It is deliberately **not** used in
this project, because it makes styling unreadable to anyone who knows CSS but not
Tailwind.

---

## Rule 3 — Class names say what the thing is

The pattern is `block__element--variant`:

| Class                        | Means                                      |
|------------------------------|--------------------------------------------|
| `.hero`                      | the hero block itself                      |
| `.hero__title`               | the title *inside* the hero (`__`)         |
| `.button--primary`           | a *variation* of a button (`--`)           |

Two underscores = "a part of". Two dashes = "a version of". That is the whole
system.

---

## Rule 4 — Colours and sizes come from the tokens file

Never type a raw colour like `#FF385C` into a page or component stylesheet. Use
the name:

```css
color: var(--color-brand);      /* ✅ */
color: #FF385C;                 /* ❌ */
```

All names are defined in [styles/01-design-tokens.css](styles/01-design-tokens.css).
Change a value there once and it updates across the entire app.

The same goes for distances. Every gap is a multiple of 4px and comes from the
spacing scale — there is one scale and no second vocabulary on top of it:

```css
padding: var(--space-4);        /* ✅ */
gap: var(--space-6);            /* ✅ */
padding: 15px;                  /* ❌ */
margin-bottom: 24px;            /* ❌ — the parent's gap decides */
```

The rules are in [docs/04-spacing.md](docs/04-spacing.md), the per-component
numbers in [docs/05-spacing-in-practice.md](docs/05-spacing-in-practice.md).

---

## Rule 5 — Every section gets a one-line comment

In both the `.tsx` and the `.css`, above each section:

```tsx
{/* HERO — big photo, headline, search bar */}
<section className="hero">
```

```css
/* ------------------------------------------------------------
   1. HERO SECTION
   The first thing a visitor sees. Full-width photo with the
   headline and search bar sitting on top of it.
   ------------------------------------------------------------ */
.hero { ... }
```

One line saying **what it is**, not how it works. Anything non-obvious
(a magic number, a browser workaround) gets its own short note on the line.

---

## Rule 6 — CSS sections appear in screen order

Inside `styles/pages/home.css`, the hero rules come first because the hero is at
the top of the page. Scrolling the stylesheet should feel like scrolling the page.

---

## Rule 7 — Responsive changes go at the bottom of their section

Not collected in one big block at the end of the file. Right after the rules they
modify, so you can see the desktop and phone versions together:

```css
.hero { min-height: 560px; }

@media (max-width: 640px) {
  .hero { min-height: 440px; }
}
```

Three screen sizes are used throughout:

| Name    | Width          | Written as                  |
|---------|----------------|-----------------------------|
| Phone   | up to 640px    | `@media (max-width: 640px)` |
| Tablet  | up to 1024px   | `@media (max-width: 1024px)`|
| Desktop | above 1024px   | the default rules           |

Styles are written for desktop first, then adjusted downward.

---

## Rule 8 — Lists that you might want to edit go at the top of the file

Categories, footer links, amenities — anything that is really just content —
goes in a clearly named block near the top:

```tsx
/* Edit this list to change the categories shown. */
const CATEGORIES = [
  { icon: "🏖️", label: "Beachfront" },
  ...
];
```

So content edits never require reading the code below it.

---

## Rule 9 — No file over ~150 lines

If a component grows past that, it is doing more than one job. Split it.

---

## Rule 10 — Money is stored in whole rupees as a number, never a string

And formatted for display with `toLocaleString("en-IN")`. Never `parseFloat` a
price. Never store money as a decimal.

---

## What Claude should do at the start of a session

1. Read this file.
2. Read [docs/01-where-things-live.md](docs/01-where-things-live.md).
3. When adding a screen, follow the existing home page as the template:
   one page file listing sections, one component per section, one CSS file per
   page with sections in screen order.
