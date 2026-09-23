# Instructions for Claude

**Read [GUIDELINES.md](GUIDELINES.md) before writing any code in this project.**
It is the rulebook and it is not optional.

## The short version

1. **One section on screen = one component file.** Page files (`app/*/page.tsx`)
   only list sections in order — no markup or logic in them.
2. **No inline utility classes. No Tailwind.** Styles go in `.css` files under
   `styles/`, using BEM names (`hero__title`, `button--primary`).
3. **No raw colours or sizes.** Always `var(--color-brand)`, never `#FF385C`.
   All tokens: `styles/01-design-tokens.css`.
4. **Every section gets a one-line comment** in both the `.tsx` and the `.css`,
   saying what it is — e.g. `{/* HERO — big photo, headline, search bar */}`.
5. **CSS sections in screen order**, with their media queries directly beneath
   them, not collected at the end of the file.
6. **Editable content lists go at the top of the file**, under a comment saying
   they're safe to edit.
7. **No file over ~150 lines.** Split instead.
8. **Money in whole rupees as a number.** Never a string, never a float.
9. When a new CSS file is created, **import it in `app/layout.tsx`** — tokens,
   base, components, pages, in that order.
10. The person maintaining this is **not a developer but reads CSS**. Optimise
    every naming and structure decision for that.

## Reference

- Where files live: `docs/01-where-things-live.md`
- Style editing: `docs/02-how-to-edit-styles.md`
- Terminology: `docs/03-glossary.md`
- Every screen and the order to build them: `docs/08-information-architecture.md`
- The home page is the worked example — follow its shape for new screens.
