# Spacing

How far apart things sit. This page is the rulebook; the per-component numbers
are in [05-spacing-in-practice.md](05-spacing-in-practice.md).

The one idea: **every gap on this site is a multiple of 4px**, and it comes
from the scale below. Nothing is "about 30 pixels". If a design asks for 30,
the answer is 32.

There is one scale and no second vocabulary on top of it. A card writes
`padding: var(--space-4)` — not a card-padding token that points at
`--space-4`.

---

## The scale

Fifteen steps, all built from a 4px base unit. The number in the name is the
multiplier, so `--space-6` is 6 × 4px = 24px.

| Token         | Value | Where it gets used                        |
|---------------|-------|-------------------------------------------|
| `--space-0`   | 0     | deliberately removing a gap               |
| `--space-0-5` | 2px   | a hairline nudge, optical correction      |
| `--space-1`   | 4px   | icon → its label                          |
| `--space-2`   | 8px   | label → input, chip → chip                |
| `--space-3`   | 12px  | button padding, list item → item          |
| `--space-4`   | 16px  | **the default**: card padding, field → field |
| `--space-5`   | 20px  | card padding when 16 feels cramped        |
| `--space-6`   | 24px  | grid gutter, page edge gutter             |
| `--space-8`   | 32px  | form section → section                    |
| `--space-10`  | 40px  | heading block → the content under it      |
| `--space-12`  | 48px  | card grid row → row                       |
| `--space-16`  | 64px  | section → section on a dense page         |
| `--space-20`  | 80px  | section → section, comfortable            |
| `--space-24`  | 96px  | **the page rhythm**: marketing sections   |
| `--space-32`  | 128px | the one huge quiet gap                    |

Lives in [`styles/design-system/07-spacing-primitives.css`](../styles/design-system/07-spacing-primitives.css).
Nothing in that file changes at a breakpoint — 4px is 4px on a phone.

**There is no 28, 36, 56 or 72.** That is on purpose. Every extra step is one
more argument about which one is right, and nobody can see the difference.

---

## The four exceptions

Four distances change with screen width. They are the only ones, and they live
in [`styles/03-grid.css`](../styles/03-grid.css) next to the media queries that
change them:

| Token                 | Desktop | Tablet | Mobile |
|-----------------------|---------|--------|--------|
| `--container-gutter`  | 24px    | 24px   | 16px   |
| `--grid-gutter`       | 24px    | 24px   | 16px   |
| `--section-gap`       | 96px    | 80px   | 64px   |
| `--section-gap-loose` | 128px   | 96px   | 80px   |

Each one picks a step from the scale. **Big gaps shrink, small gaps never do** —
a 96px band gap costs a quarter of a phone screen, a 4px icon gap costs
nothing and shrinking button padding only makes it harder to tap.

---

## The hierarchy

Five levels. Pick the level first, then the exact step.

```
Micro       2–8px     inside one control — icon to label
   ↓
Component   12–24px   inside one card, panel or field
   ↓
Group       32–48px   between blocks that read as one idea
   ↓
Section     64–96px   between the bands of a page
   ↓
Page        128px     around the whole thing
```

Every level is at least **1.5× the one above it**. That jump is what makes the
hierarchy visible: a reader sees which things belong together without reading a
word. If two levels look similar on screen, one of them is wrong.

---

## Internal vs external

The distinction that stops layouts drifting.

**Internal** — space *inside* a component. It is the component's own business,
it comes from `padding`, and it does not change when the component moves.

> Button padding · card padding · input padding · table cell padding

**External** — space *between* components. It belongs to whatever contains
them, it comes from `gap` on the parent, and it changes with context.

> Card → card · section → section · heading → content

Two rules follow:

1. **A component never sets its own outside margin.** A card does not know what
   sits above it. The parent's `gap` decides. This is the single most common
   cause of "why is there 40px here and 24px there".
2. **Use `gap`, not `margin`, for stacks and grids.** One value on the parent
   instead of a margin on every child, and no last-child exception to remember.

---

## How spacing meets the other foundations

Spacing does not start from nothing — it starts from text.

```
Typography        16px body text, 1.6 line-height
     ↓
Line box          ~26px tall
     ↓
Component height  26 + 12 top + 12 bottom padding = 50px button
     ↓
Component spacing 8px between two buttons
     ↓
Layout spacing    24px grid gutter, 96px section gap
```

- **Typography** — padding is chosen so the finished control lands on the 4px
  grid. That is why button padding is 12px, not 10px.
- **Grid** — the gutter is a step from this scale, so columns and stacks
  breathe the same amount.
- **Radius** — padding should be at least the corner radius, or content clips
  into the curve. 16px padding with a 10px radius is comfortable.
- **Sizing** — a 44px tap target is a *size*; padding is usually what gets it
  there.
