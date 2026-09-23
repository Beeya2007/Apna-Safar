# Radius

Rounded corners. Five values, and that is the whole system.

The brand is **square-ish on purpose** — printed-postcard warmth, not a rounded
phone app. The softest thing on a page should be the photography, not the boxes
around it.

---

## The scale

| Token           | Value | Shape  | What it is for                              |
|-----------------|-------|--------|---------------------------------------------|
| `--radius-none` | 0     | Sharp  | Sections, bands, table rows, full-bleed media |
| `--radius-sm`   | 4px   | Subtle | **Controls** — button, input, select, checkbox |
| `--radius-md`   | 8px   | Rounded| **Containers** — card, image, dropdown, tooltip |
| `--radius-lg`   | 16px  | Soft   | **Big surfaces** — modal, drawer, panel      |
| `--radius-full` | 999px | Pill   | Chip, tag, badge, avatar, icon button, toggle |

Lives in [`styles/design-system/08-radius.css`](../styles/design-system/08-radius.css).

**Each step doubles.** That is what makes the difference always visible and the
choice always obvious. The three real values — 4, 8, 16 — are the same steps as
`--space-1`, `--space-2` and `--space-4`, which is what makes the nesting rule
below come out to whole numbers.

**Two values moved** when this scale replaced the old one: `--radius-sm` was
6px and `--radius-md` was 10px. `--radius-xs` is kept as an alias for 4px so
older CSS keeps working.

### What is not in the scale

- **No 2px** — indistinguishable from square at any size the eye meets it.
- **No 6px** — it only ever means "4, but for buttons", and a button has no
  claim to a different shape from the input beside it.
- **No 12, 20, 24** — a surface that wants 12 is either a container (8) or a
  big surface (16), and deciding which is the useful question.

---

## Which one to use

The rule underneath everything: **the bigger and more detached a surface, the
larger its corner. Anything touching an edge is square.**

| Surface | Radius |
|---|---|
| Page, section, band, table row | `--radius-none` |
| Button, input, select, textarea, checkbox | `--radius-sm` |
| Card, image, banner, dropdown, popover, tooltip | `--radius-md` |
| Modal, drawer, sheet, full-width panel | `--radius-lg` |
| Chip, tag, badge, avatar, icon button, toggle, radio | `--radius-full` |

Radius is a proxy for **size, not importance**. A bigger surface can carry a
bigger corner; a more important one cannot. Reaching for the next step up to
make something feel friendlier is how a system ends up with five kinds of card.

`--radius-lg` is only for surfaces wider than about 400px. On a small box, 16px
eats the corner and content starts colliding with the curve.

---

## Pill and circle

`--radius-full` is not a size, it is a **shape**. 999px is simply larger than
half of anything it will be applied to, so the browser clamps it and one value
covers a 24px chip and a 56px floating button.

Use it when the shape means something: a pill says *"a small self-contained
token"*, a circle says *"one thing"*. Radio buttons and toggles use it for that
reason — a circle says "exactly one" and a capsule says "on or off".

**Do not use it to soften a rectangle.** A pill-shaped card is a lozenge, and a
pill-shaped button reads as a chip — which matters, because a chip is something
you select and a button is something you press.

**A circle is `--radius-full` plus equal width and height.** Set both explicitly
rather than letting content decide, or you get a lozenge. Use `--radius-full`
rather than `50%`, so a box that is accidentally not square degrades to a pill
instead of an ellipse.

---

## Nested corners

```
inner radius = outer radius − padding
```

A 16px card with 8px of padding wants an 8px image inside it. Matching the
parent's radius leaves a widening sliver of background in each corner; the eye
reads it as a wobble long before anyone works out what it is.

- **Padding larger than the outer radius means the inner corner is square.** A
  card with 16px padding and a 16px radius holds a square-cornered image, and
  that is correct, not lazy.
- **A control keeps its own radius regardless of what holds it.** A button is
  `--radius-sm` inside a card, a modal or a page. Only *surfaces* take part in
  the arithmetic.
- **A flush child inherits the parent's corner**, not a smaller one — an image
  running edge to edge at the top of a card takes the card's radius on its top
  two corners and none on the bottom.

---

## Borders, shadows and clipping

- **Borders** sit on the radius, so both follow the same curve. A border makes a
  small radius read larger — 1px around a 4px corner looks closer to 5px.
- **Shadows** follow the radius on their own. Never fake one with a square
  element behind a rounded box.
- **Focus rings** — `outline` follows the element's radius, including a pill, so
  the ring always fits. This only works if the radius is on the element the
  browser is focusing: put it on the `<button>`, not a wrapper `<div>`.
- **Clipping** — a rounded parent does **not** round its children. Anything
  running to the parent's edge needs `overflow: hidden` on the parent, or its
  square corners punch through the curve. `overflow: hidden` also clips shadows
  and popovers, so put it on the smallest wrapper that needs it.

---

## Responsive

**Radius does not change with screen width.** 8px is 8px on a phone. A corner is
a property of the shape, and the shape is the same object on every device.

The one exception is a component whose *size* changes materially — a modal that
becomes a full-height bottom sheet on a phone keeps `--radius-lg` on its top two
corners and drops to `--radius-none` on the bottom two, because those now touch
the edge of the screen. That is the square-at-the-edge rule, not radius being
responsive.

---

## Accessibility

- **Focus** — `outline` plus `outline-offset`, so the ring follows the corner
  and stays clear of any border.
- **Touch targets** — radius does not shrink a hit area, but a 44px circular
  button must be 44px wide, not 44px of visible circle inside a smaller box.
- **Small controls** — a 16px checkbox keeps `--radius-sm`. Anything larger
  rounds away the corner a person is aiming at.
- **High contrast** — corners come from `background` and `border`, both of which
  forced-colours mode keeps. Nothing here relies on a shadow being visible.
- **Never signal state with shape alone.** A change of radius is invisible to a
  screen reader and ambiguous to everyone else. Change fill or border, and say
  it in the markup.

---

## Do and don't

| Don't                                      | Do                                        |
|--------------------------------------------|-------------------------------------------|
| `border-radius: 10px`                      | `border-radius: var(--radius-md)`         |
| A different corner for each component      | One corner per job — all controls are `sm` |
| Matching the parent's radius on an inset child | Subtract the padding                   |
| A photo with square corners in a round card | `overflow: hidden` on the card            |
| `--radius-full` to soften a rectangle      | `--radius-full` only where the shape means something |
| Rounding a full-bleed section              | Square wherever a surface touches the viewport |
| `border-radius: 50%` for an avatar         | `--radius-full` on a square box            |
