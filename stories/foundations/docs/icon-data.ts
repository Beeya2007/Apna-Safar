/* The icon browser's data layer.
   ------------------------------------------------------------
   Everything here comes from Phosphor's own packages. The icon
   list, the categories and the search keywords are read from
   @phosphor-icons/core at runtime — there is no hand-copied
   list in this repo to fall out of date when Phosphor ships a
   release. The components come from @phosphor-icons/react. */
import { icons as phosphorIcons } from '@phosphor-icons/core';
import * as Phosphor from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';

export type IconEntry = {
  name: string;         /* kebab, as Phosphor names the asset  */
  pascal: string;       /* PascalCase, the React component name */
  categories: string[];
  tags: string[];
  Component: Icon;
};

const registry = Phosphor as unknown as Record<string, Icon>;

/* Phosphor ships metadata for a few icons ahead of the React
   package, so anything without a component is dropped rather
   than rendered as a hole in the grid. */
export const ICONS: IconEntry[] = phosphorIcons
  .map((i) => ({
    /* Phosphor types these as readonly literal tuples; the
       browser only ever reads them, so widening to string[] is
       the honest shape for everything downstream. */
    name: i.name as string,
    pascal: i.pascal_name as string,
    categories: [...(i.categories ?? [])] as string[],
    tags: [...(i.tags ?? [])] as string[],
    Component: registry[i.pascal_name],
  }))
  .filter((i): i is IconEntry => typeof i.Component !== 'undefined');

export const CATEGORIES: string[] = Array.from(
  new Set(ICONS.flatMap((i) => i.categories)),
).sort();

/* Search covers the name, the category and Phosphor's own
   keyword tags, which is what makes "payment" find CreditCard
   and "settings" find Gear. */
export function searchIcons(query: string, category: string): IconEntry[] {
  const q = query.trim().toLowerCase();
  return ICONS.filter((i) => {
    if (category !== 'all' && !i.categories.includes(category)) return false;
    if (!q) return true;
    return (
      i.name.includes(q) ||
      i.pascal.toLowerCase().includes(q) ||
      i.categories.some((c) => c.includes(q)) ||
      i.tags.some((t) => t.includes(q))
    );
  });
}

/* ---- WEIGHTS — Phosphor's six, no renaming -----------------
   LIGHT is the project default, set on IconContext in
   components/shared/IconDefaults.tsx. It is listed first here
   because the browser should open on what the product uses. */
export const WEIGHTS = ['light', 'regular', 'thin', 'bold', 'fill', 'duotone'] as const;
export type Weight = (typeof WEIGHTS)[number];

/* ---- SIZES — read from the Sizing foundation ---------------
   Not a new scale. These are the --icon-size-* tokens, which
   are themselves steps of --size-*. Iconography owns none of
   these numbers. */
export const SIZES: { token: string; px: number; use: string }[] = [
  { token: '--icon-size-xs', px: 12, use: 'inside a 24px dense control' },
  { token: '--icon-size-sm', px: 16, use: 'inside a 32px compact control' },
  { token: '--icon-size-md', px: 20, use: 'THE DEFAULT — inside a 40px control' },
  { token: '--icon-size-lg', px: 24, use: 'inside a 48px control, standalone' },
  { token: '--icon-size-xl', px: 32, use: 'empty states, feature marks' },
];

/* ---- COLOURS — read from the Colour foundation -------------
   Semantic tokens only. There is no icon palette: an icon is
   content, and it takes a content colour. */
export const COLORS: { label: string; token: string }[] = [
  { label: 'Content / Primary',    token: '--color-content-primary' },
  { label: 'Content / Secondary',  token: '--color-content-secondary' },
  { label: 'Content / Tertiary',   token: '--color-content-tertiary' },
  { label: 'Content / Disabled',   token: '--color-content-disabled' },
  { label: 'Content / Inverse',    token: '--color-content-inverse' },
  { label: 'Interactive / Link',   token: '--color-content-link' },
  { label: 'Interactive / Hover',  token: '--color-content-link-hover' },
  { label: 'Status / Success',     token: '--color-status-success-icon' },
  { label: 'Status / Warning',     token: '--color-status-warning-icon' },
  { label: 'Status / Error',       token: '--color-status-error-icon' },
  { label: 'Status / Info',        token: '--color-status-info-icon' },
];

/* ---- SURFACES — to check a colour actually works on one ---- */
export const SURFACES: { label: string; token: string }[] = [
  { label: 'Default', token: '--color-surface-default' },
  { label: 'Subtle',  token: '--color-surface-subtle' },
  { label: 'Raised',  token: '--color-surface-raised' },
  { label: 'Sunken',  token: '--color-surface-sunken' },
  { label: 'Inverse', token: '--color-surface-inverse' },
];

/* ---- ALIASES ----------------------------------------------
   The Phosphor name is the source of truth. These three exist
   only because they are what people type into the search box,
   and the search would otherwise come back empty. They are a
   search convenience, NOT an alternate name to code against. */
export const ALIASES: Record<string, string> = {
  search: 'magnifying-glass',
  close: 'x',
  settings: 'gear',
  delete: 'trash',
  edit: 'pencil',
  menu: 'list',
  more: 'dots-three',
  back: 'arrow-left',
  tick: 'check',
};

export function resolveAlias(query: string): string {
  const q = query.trim().toLowerCase();
  return ALIASES[q] ?? query;
}
