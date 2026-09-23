# Elevation & shadows

Depth. Five levels, and each one means something.

Elevation says **this surface is in front of that one**. It is not decoration,
and most things on a page should be at level 0.

---

## The scale

| Token | Name | What sits here |
|-------|------|----------------|
| `--elevation-0` | On the page | sections, table rows, inputs, buttons, flat grids |
| `--elevation-1` | Resting | a card that reads as its own object |
| `--elevation-2` | Lifted | sticky header, a card under the cursor |
| `--elevation-3` | Floating | dropdown, popover, tooltip, menu |
| `--elevation-4` | Overlay | modal, drawer, toast, floating button |

Lives in [`styles/design-system/12-elevation.css`](../styles/design-system/12-elevation.css).

Offset and blur roughly double each level; alpha rises slowly. There is no
level 5 — if you want something above a modal, the modal is the wrong container.

### One token, two mechanisms

Every level is a `box-shadow` whose first layer is a 1px ring:

```
0 0 0 1px <ring>,  <contact shadow>,  <ambient shadow>
```

The ring is what makes this survive dark mode, where a black shadow on a
near-black page is invisible. It costs no layout space, it follows the corner
radius for free, and a component asks for **one token** instead of remembering
to add a border in one theme and not the other.

---

## When not to use it

The most common misuse is a shadow on every card. Twelve raised objects are
twelve things competing, which is the same as no hierarchy at all.

| Instead of a shadow | Use |
|---|---|
| Separating two blocks of content | **Spacing.** A 48px gap separates better. |
| Separating rows in a list or table | **A divider.** One hairline, not twelve shadows. |
| Making a card look like an object | **A border**, or the surface colour. |
| Making something feel important | **Nothing.** Importance is size, position and words. |

A card needs a shadow when it is genuinely in front of something: overlapping
other content, floating over a photograph, or being dragged.

---

## Light and dark

The two themes are **rebuilt, not reused**.

| | Light | Dark |
|---|---|---|
| What separates surfaces | the shadow | the ring, and the surface colour |
| Shadow colour | warm brown `60 35 20` — grey reads as dirt on cream | pure black — a warm shadow is a brown smudge |
| Level 1 | a hairline shadow | **none**, only the ring |
| Levels 3–4 | large and soft | tighter and stronger; they sit over a scrim |
| Ring | transparent below level 3 | visible at every level |

This follows the rule the Colour foundation already set: **on dark, surfaces
lift by gaining light, never by gaining shadow.**

---

## Layers

Elevation says how far forward something *looks*. Layers say what is actually in
front of what. A tooltip has a smaller shadow than a modal but must appear above
one.

| Token | z-index | What sits here |
|---|---|---|
| `--layer-base` | 0 | normal flow — almost everything |
| `--layer-raised` | 1 | lifted inside its own stacking context |
| `--layer-sticky` | 100 | sticky table header, filter bar |
| `--layer-header` | 200 | the site header |
| `--layer-dropdown` | 300 | select, autocomplete |
| `--layer-popover` | 400 | date picker, guest picker |
| `--layer-drawer` | 500 | a panel sliding in from an edge |
| `--layer-modal` | 600 | a dialog and its scrim |
| `--layer-toast` | 700 | must be readable over a modal |
| `--layer-tooltip` | 800 | can be triggered from inside any of them |

Lives in [`styles/design-system/13-layer.css`](../styles/design-system/13-layer.css).

Levels are **100 apart** so a new one can be slotted between two existing ones
without renumbering. Scrims sit one below the thing they dim — never at the same
number, or the browser decides by DOM order.

**No component should write a number.** A raw `z-index` is a guess about every
other component in the product.

---

## Components

| Component | Level | Layer |
|---|---|---|
| Section, band, table row | 0 | base |
| Input, select, button | 0 — a border or fill, not a shadow | base |
| Card in a grid | 0 or 1 | base |
| Card over a photograph | 2 | base |
| Sticky filter bar | 2 | sticky |
| Site header | 2 scrolled, 0 at rest | header |
| Dropdown, menu | 3 | dropdown |
| Popover, date picker | 3 | popover |
| Tooltip | 3 | tooltip |
| Drawer | 4 | drawer |
| Modal | 4 | modal |
| Toast | 4 | toast |

---

## Interaction

| State | Elevation |
|---|---|
| Default | its resting level |
| Hover | one step up, and only if the thing is genuinely liftable |
| Pressed | one step **down** — you are pushing it |
| Focus | unchanged. Focus is a ring, not a height. |
| Selected | unchanged. Selection is fill and border. |
| Disabled | unchanged, or flattened to 0 |
| Dragging | level 4, for as long as the gesture lasts |

**Only the shadow animates.** A card that grows or translates on hover pushes
its neighbours around and makes a grid feel unstable. `transition: box-shadow`,
nothing else.

---

## Borders and radius

| Situation | Treatment |
|---|---|
| Flat on the page | neither |
| Flat, but its own object — an input, a flat card | **border** |
| Genuinely above the page — a resting card | **shadow** |
| Floating over content it did not push aside — a popover | **both** |

A `box-shadow` follows the element's own radius automatically. Never fake one
with a positioned element behind a rounded box. `overflow: hidden` on a parent
clips a child's shadow — put it on the smallest wrapper that needs it.

---

## Accessibility

**Elevation is never the only signal.** A shadow is invisible in forced-colours
mode, at low contrast sensitivity, and on a bad display.

- **Boundaries** — the ring is part of every level and is a real 1px line in
  dark and forced-colours mode.
- **Focus** — an `outline`, never a change of elevation. The two must not be
  confusable.
- **Interactive things** — identified by fill, border, cursor and an accessible
  name, never by shadow alone.
- **Dark mode** — surface colour carries the separation; shadow is a bonus.
- **Reduced motion** — the elevation *change* still happens, only the tween is
  dropped. Someone who asked for less motion still needs to see which card they
  picked up.

---

## Performance

A `box-shadow` is cheap to paint once and expensive to repaint.

- Animate it **only on the element being interacted with**, never across a grid.
- Never recalculate one in a scroll handler — the header's level-2 shadow is
  toggled by a class.
- Prefer a border or a surface colour when either will do. Both are cheaper and
  both survive forced-colours mode.

The ring layer is free: it is part of the same `box-shadow` the element already
paints, not a second property.

---

## Do and don't

| Don't | Do |
|---|---|
| `box-shadow: 0 2px 8px rgba(0,0,0,.2)` | `box-shadow: var(--elevation-2)` |
| `z-index: 9999` | `z-index: var(--layer-popover)` |
| A shadow on every card in a grid | Level 0, and let one thing lead |
| A shadow where a 48px gap would say it | Spacing, or a divider |
| A pressed button flying toward the viewer | One step down on press |
| Relying on the shadow alone | Change surface colour and elevation together |
| `transition: all` on a card | `transition: box-shadow` |
| Growing a card on hover | Lift it — nothing moves, nothing resizes |
