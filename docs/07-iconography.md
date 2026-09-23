# Iconography

The icon library is **Phosphor**. It is not copied into this repo and no icon is
drawn here: the package is the source of truth, and the browser in Storybook
reads Phosphor's own metadata so the list cannot go stale.

> **Storybook → Foundations → Iconography** — search 1,500+ icons, set weight,
> size and colour with design-system tokens, and copy the code.

```bash
npm install @phosphor-icons/react @phosphor-icons/core
```

`@phosphor-icons/react` has the components; `@phosphor-icons/core` has the
names, categories and search keywords.

---

## What iconography owns

Almost nothing, on purpose:

```
Colour foundation   →  an icon takes a CONTENT colour
Sizing foundation   →  --icon-size-xs … xl, already defined
Radius foundation   →  an icon button takes --radius-sm or --radius-full
Spacing foundation  →  icon-to-label gaps are --space-1 / --space-2
```

There is no icon palette, no icon size scale and no icon state system. A
duplicate of any of those is a second source of truth that drifts within a
release. What is left — how an icon sits beside text, and how an icon button is
built — is [`styles/design-system/11-icon.css`](../styles/design-system/11-icon.css),
and it is 100 lines.

---

## Using one

```tsx
import { ArrowRight } from "@phosphor-icons/react";

<ArrowRight size={20} />
```

**No `weight` prop, on purpose.** `light` is the default for every lined icon,
set once on `IconContext` in
[`components/shared/IconDefaults.tsx`](../components/shared/IconDefaults.tsx)
along with the 20px default size. Write a weight out only where the icon needs
a different one.

**Do not set a colour unless the icon means something the text does not.**
Phosphor renders `currentColor`, so an icon inside a button or a link follows
the text beside it for free — including on hover, which a hard-coded colour
will not.

When the icon does carry its own meaning, use a token, never a hex:

```tsx
<WarningCircle size={20} weight="fill" color="var(--color-status-error-icon)" />
```

---

## Sizes

| Token | Value | Use |
|---|---|---|
| `--icon-size-xs` | 12px | inside a 24px dense control |
| `--icon-size-sm` | 16px | inside a 32px control, or beside small text |
| `--icon-size-md` | 20px | **the default** — 40px control, body text |
| `--icon-size-lg` | 24px | inside a 48px control, or standalone |
| `--icon-size-xl` | 32px | empty states, feature marks |

Match the icon to the text's **cap height**, not its line height. Cap height
reads as part of the sentence; line height reads as a bullet beside it.

---

## Weights

**`light` is the default.** The rest of the page is a delicate editorial serif
on cream; a regular-weight icon beside Season Mix reads as a heavier object than
the words it belongs to.

| Weight | When |
|---|---|
| `light` | **Everything lined.** The default — do not write it out. |
| `regular` | Where a light stroke thins out: 12px icons, and icons over photography. |
| `bold` | Rare. Emphasis that heavier text beside it already carries. |
| `fill` | The *selected* state of a nav item or toggle. |
| `thin` | Large decorative marks only. It vanishes under 24px. |
| `duotone` | Illustration and empty states. Never in a control — it adds a second colour the colour foundation does not manage. |

**One weight per surface.** A toolbar with three `light` icons and one `bold`
reads as a rendering bug, not as emphasis.

---

## Alignment

| Rule | Value |
|---|---|
| Icon → label, 20/24px icons | `--space-2` (8px) |
| Icon → label, 12/16px icons | `--space-1` (4px) |
| Leading vs trailing gap | the same — an asymmetric gap is visible and unexplainable |
| In a flex row | `align-items: center` |
| In flowing text | `vertical-align: -0.125em` |

Text sits on a baseline; an icon box does not. The `0.125em` nudge is what stops
an icon floating above the words, and being in `em` it holds at every text size.
Both are in the `.icon` and `.icon-text` classes — use those rather than
re-deriving it.

---

## Icon buttons

Composition, not a new component:

| Property | Value |
|---|---|
| Size | 32 / **40** / 48px, from `--control-height-*` |
| Icon inside | 16 / 20 / 24px |
| Padding | none — the button is square and the size *is* the padding |
| Radius | `--radius-sm`, or `--radius-full` when floating |
| Hover / pressed | `--color-state-hover` / `--color-state-pressed` |
| Selected | `--color-state-selected` + `aria-pressed` + `fill` weight |
| Focus | `outline` + 2px offset |
| Disabled | `--color-content-disabled`, same size |

A 32px button is under the 44px touch target. It does not grow on screen — it
grows its **hit area** with an invisible inset pseudo-element on coarse
pointers.

---

## Accessibility

It comes down to one question: **does this icon carry meaning the text next to
it does not?**

| Kind | Markup |
|---|---|
| Decorative — the text says it too | `aria-hidden="true"` |
| Informative — no text beside it | `role="img"` + `aria-label` |
| Interactive — icon-only button | `<button aria-label="Delete booking">` |

Phosphor renders an `<svg>` with no accessible name, which is the right default:
an icon is silent until you decide it should speak.

- **Contrast** — an icon is a graphic, so the bar is **3:1**, not 4.5:1.
- **Focus** — the ring goes on the `<button>`, not the `<svg>`.
- **Touch** — 44px on a coarse pointer, whatever the icon size.
- **Never signal state by colour or glyph alone.** Say it in words too.

---

## Naming

**The Phosphor name is the name** — `MagnifyingGlass`, not `Search`. One name in
code, in Figma and in conversation.

The browser accepts a few aliases *at the search box only*, because they are
what people type: `search → magnifying-glass`, `close → x`, `settings → gear`,
`delete → trash`, `edit → pencil`, `menu → list`. They never appear in code, and
new ones should not be added lightly — a private vocabulary is what stops a
shared library being shared.

---

## Figma

- Use the **Phosphor Icons** plugin or community library. Do not redraw or
  hand-import icons.
- Keep Phosphor's names, or nobody can match a layer to a component.
- Size with the frame, not by scaling the vector: 12 / 16 / 20 / 24 / 32.
- Colour with **Colour foundation variables**, never a picked hex, so light and
  dark resolve the same way they do in code.
- Weight is a variant property matching Phosphor's six.

---

## Do and don't

| Don't | Do |
|---|---|
| `color="#C2402B"` | `color="var(--color-status-error-icon)"`, or no colour at all |
| Setting a colour inside a button | Let it inherit `currentColor` so hover works |
| An internal name like `Search` | `MagnifyingGlass` everywhere |
| An icon-only button with no label | `aria-label` on every one |
| A decorative icon a screen reader reads out | `aria-hidden="true"` |
| `weight="light"` on every icon | Let it inherit — light is already the default |
| Mixing weights on one surface | One weight, with `fill` reserved for selected |
| Red vs green as the whole message | A different glyph, and a word |
| Drawing an icon that Phosphor already has | Search the browser first |
