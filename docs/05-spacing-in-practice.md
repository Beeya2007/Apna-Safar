# Spacing in practice

The recipes. The rules behind them are in [04-spacing.md](04-spacing.md).

Every number below is a step from the one scale. There are no component
spacing tokens — a card writes `padding: var(--space-4)` directly.

---

## Components

### Buttons

| Measurement        | Use          | Value |
|--------------------|--------------|-------|
| Padding            | `0.75em 1em` | ~12 / 16px |
| Icon → label       | `--space-1`  | 4px   |
| Button → button    | `--space-2`  | 8px   |
| Minimum tap target | —            | 44px  |

Button padding is written in `em`, not a scale step, so the box grows with the
label when a reader enlarges text. It is the one place `em` beats the scale:
fixed padding around text that has grown to 24px is how labels get clipped.

### Inputs and forms

| Measurement         | Use         | Value |
|---------------------|-------------|-------|
| Padding             | `--space-3` / `--space-4` | 12 / 16px |
| Label → input       | `--space-2` | 8px   |
| Input → helper text | `--space-1` | 4px   |
| Input → error       | `--space-1` | 4px   |
| Field → field       | `--space-4` | 16px  |
| Section → section   | `--space-8` | 32px  |

The important one is **8px inside a field, 16px between fields**. That 2:1
difference is what makes a form read as rows instead of one long column. Get
it backwards and every label looks attached to the field above it.

### Cards

| Measurement      | Use         | Value |
|------------------|-------------|-------|
| Padding          | `--space-4` | 16px  |
| Title → subtitle | `--space-2` | 8px   |
| Header → content | `--space-3` | 12px  |
| Content → footer | `--space-4` | 16px  |
| Card → card      | `--space-6` | 24px  |

All four sides of a card get the same padding. Different top and side padding
looks broken before anyone can explain why.

### Lists

| Measurement         | Use         | Value |
|---------------------|-------------|-------|
| Item → item         | `--space-3` | 12px  |
| Icon → content      | `--space-3` | 12px  |
| Primary → secondary | `--space-1` | 4px   |
| Group → group       | `--space-6` | 24px  |

### Tables

| Measurement    | Use         | Value |
|----------------|-------------|-------|
| Cell padding   | `--space-3` / `--space-4` | 12 / 16px |
| Dense cell     | `--space-2` | 8px   |
| Header padding | `--space-3` | 12px  |

Rows are separated by a border, never by a gap. Row rhythm is cell padding,
doubled.

---

## Layout

| What                      | Use                   | Desktop |
|---------------------------|-----------------------|---------|
| Page edge → content       | `--container-gutter`  | 24px    |
| Header → first band       | `--space-12`          | 48px    |
| Grid column gap           | `--grid-gutter`       | 24px    |
| Grid row gap, card grids  | `--space-12`          | 48px    |
| Heading block → content   | `--space-10`          | 40px    |
| Band → band               | `--section-gap`       | 96px    |
| Band → band, quiet        | `--section-gap-loose` | 128px   |
| Last band → footer        | `--section-gap`       | 96px    |

Row gaps in a card grid are larger than column gaps (48 vs 24). Cards are wider
than they are apart, so an equal gap reads as too tight vertically.

---

## Responsive

Only the four layout distances change. Everything inside a component stays
exactly where it is, on every screen.

| Token                 | Desktop | Tablet | Mobile |
|-----------------------|---------|--------|--------|
| `--container-gutter`  | 24px    | 24px   | 16px   |
| `--grid-gutter`       | 24px    | 24px   | 16px   |
| `--section-gap`       | 96px    | 80px   | 64px   |
| `--section-gap-loose` | 128px   | 96px   | 80px   |

This happens in one place — the media queries at the top of
[`styles/03-grid.css`](../styles/03-grid.css). **No component file should
contain a media query that changes a gap.**

---

## Optical spacing

Maths gets you close; the eye is the judge. `--space-0-5` (2px) exists for
exactly this.

- **Icons** — an icon's artwork sits inside padding of its own, so a 4px gap
  can look like 6px. Close it to 2px rather than adding another 4.
- **Circular controls** — a circle touches its box at one point only, so it
  reads further away than a square at the same distance. Tighten slightly.
- **Type** — letters carry space above and below. A heading sitting 24px above
  a paragraph usually looks like 28px. Trim, do not add.
- **Mixed sizes** — a large number beside small text needs less gap than two
  equal-sized items.

The limits: a nudge is **one step on the scale, or 2px — never a new number**,
it applies to one specific pairing, and it gets a comment saying why. "It
looked better" is a reason; write it down. If you find yourself nudging the
same thing in five files, the step is wrong — change the step.

---

## Accessibility

- **Tap targets** are at least 44 × 44px, padding included.
- **Focus rings** are drawn outside the element and need room to land. Two
  focusable things sit at least 8px apart, which is why 4px is never a gap
  between controls.
- **Text resizing** — padding that hugs a string is written in `em`, so the
  box grows with the text instead of clipping it.
- **Zoom and reflow** — at 400% zoom the layout must still work in one column
  with no sideways scrolling. Gutters are the first thing to shrink; internal
  padding is the last.
- **Readability** — a paragraph stays inside `--width-text` (620px). Line
  length matters more than any gap around it.

---

## Do and don't

| Don't                                        | Do                                      |
|----------------------------------------------|-----------------------------------------|
| `padding: 15px`                              | `padding: var(--space-4)`               |
| `margin-bottom: 24px` on every card          | `gap: var(--space-6)` on the parent     |
| `padding: 16px 20px 12px 16px`               | one value on all four sides             |
| A media query in `listing-card.css` that changes a gap | leave it — gaps inside a component do not move |
| A new `--space-7` because 28 looked right    | pick 24 or 32                           |
| `margin-top` on a section component          | let the page's section gap do it        |
