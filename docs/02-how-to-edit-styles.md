# How to edit styles yourself

Written for someone who knows some CSS but not this codebase.

---

## The 30-second version

1. Find the section on screen.
2. Open the CSS file for that page or component.
3. Find the comment block with that section's name.
4. Change the value. Save. The browser updates by itself.

---

## Step 1 — Which file?

Ask "does this appear on more than one page?"

| Thing you want to change        | File to open                             |
|---------------------------------|------------------------------------------|
| Brand colour, text sizes, spacing scale | `styles/01-design-tokens.css`    |
| Something only on the home page | `styles/pages/home.css`                  |
| Buttons, anywhere               | `styles/components/button.css`           |
| Top bar                         | `styles/components/header.css`           |
| Bottom links                    | `styles/components/footer.css`           |
| Place-to-stay tiles             | `styles/components/listing-card.css`     |
| The Where/When/Who search pill  | `styles/components/search-bar.css`       |

**Shortcut:** open the page in Chrome, right-click the thing → *Inspect*. The
class name shown (say `hero__title`) is exactly what you search for in the files.

---

## Step 2 — Change the value

Every section is labelled. Inside `styles/pages/home.css`:

```css
/* ------------------------------------------------------------
   1. HERO SECTION
   The first thing a visitor sees...
   ------------------------------------------------------------ */

.hero {
  min-height: 560px;          ← make the hero taller or shorter
  background-image: url("/images/hero.svg");   ← swap the photo
}

.hero__overlay {
  background: rgba(0, 0, 0, 0.42);   ← raise 0.42 to darken the photo
}
```

---

## Step 3 — Use token names, not raw values

This is the one rule that matters. Instead of typing a colour:

```css
color: #FF385C;               /* ❌ only changes this one spot */
color: var(--color-brand);    /* ✅ stays in sync with everything else */
```

The full list of names is at the top of `styles/01-design-tokens.css`, each with
a comment saying what it is for.

The common ones:

```css
var(--color-brand)        the pink
var(--color-text)         normal dark text
var(--color-text-muted)   grey supporting text
var(--color-border)       hairlines
var(--space-md)           16px  — the standard gap
var(--space-lg)           24px
var(--radius-md)          12px  — rounded photo corners
var(--text-title)         section heading size
```

---

## Rebranding the whole app in one edit

Open `styles/01-design-tokens.css` and change three lines:

```css
--color-brand:       #FF385C;   →  your brand colour
--color-brand-dark:  #E01B42;   →  a darker shade of it (hover states)
--color-brand-light: #FFF0F3;   →  a very pale shade of it (backgrounds)
```

Every button, link, price and highlight in the app updates.

---

## Making something responsive

Responsive rules sit at the bottom of the section they belong to. Desktop styles
are written first, then adjusted for smaller screens:

```css
.hero { min-height: 560px; }        /* desktop and everything by default */

@media (max-width: 640px) {         /* phones only */
  .hero { min-height: 440px; }
}
```

Use these three widths only, so the app stays consistent:

```css
@media (max-width: 1024px) { }   /* tablet and below */
@media (max-width:  640px) { }   /* phone */
@media (max-width:  480px) { }   /* small phone */
```

---

## Things that are easy to get wrong

**Changing a size does nothing.** Something more specific is overriding it. In
Chrome's Inspect panel, overridden rules show with a ~~strikethrough~~ — that
tells you which file is winning.

**The layout breaks when you add padding.** It shouldn't — `box-sizing:
border-box` in `02-base.css` prevents it. If it does, something set
`box-sizing` back to default.

**A grid won't go to one column on phones.** The grid uses
`repeat(auto-fill, minmax(260px, 1fr))`, which already adapts by itself. Only
override it if you specifically want fewer columns than would fit.

**Colours look wrong after a token change.** Some place typed a raw hex code
instead of a token name. Search the styles folder for `#` to find it.

---

## Seeing your changes

```bash
npm run dev
```

Then open http://localhost:3000. Save a CSS file and the browser updates
instantly — no refresh needed.

To check the phone layout: Chrome → right-click → Inspect → click the
phone/tablet icon at the top-left of the panel.
